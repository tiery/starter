/*
 * PX ad management
 */	
(function() {
	
	// Module declaration
	var moduleName = 'ad',
		logPrefix = 'px.' + moduleName;
		
	if (!PX.mod.test(moduleName, ['test'])) {
		return;
	}
	
	// Private properties
	var _ad = {},
		_stop = PX.config.stopAd;
	
	// Module definition
	PX[moduleName] = {
		
		// Write ad
		write: function (name) {
			var context = this.isContext(name),
                regie;
			if (!context) {
	    		return;
	  		}
	  		else {
	  			if (context.destination) {
		  			PX.ads[name].destination = context.destination;
	  			}
	  			regie = _ad.regie || PX.config.adsRegie || false;
	  			if (regie && this[regie]) {
                    this[regie]();
	  			}
	  			else {
                    PXU.log(logPrefix + ' : Regie undefined!', 'error');
	  			}
	  		}
		},
		
		// Test context for ad to be displayed
		isContext: function (name) {
			var breakpoint,
				destination,
				idDest,
				idDestRWD;
			
			if (_stop) {
				PXU.log(logPrefix + ' : Ads disabled!', 'warn');
				return;
			}
			
			// if ad doesn't exist
			if (!PX.ads[name]) {
				PXU.log(logPrefix + ' : is not declared in PX.ads - ' + name, 'warn');
				return;
			}
			
			_ad = PX.ads[name];
			_ad.name = name;
			
			// is already loaded?
			if (_ad.loaded) {
				PXU.log(logPrefix + ' : already loaded - ' + name, 'warn');
				return;
			}
				
			// RWD
			if (_ad.rwd && !PX.test('rwd', _ad.rwd)) {
				PXU.log(logPrefix + ' : RWD doesn\'t match - ' + name, 'warn');
				return;
			}
			
			// Check ad datas
			if (!_ad.datas) {
				PXU.log(logPrefix + ' : datas error - ' + name, 'warn');
				return;
			}
			
			// Destination element
			else {
				if (_ad.stay) {
					return true;
				}
				
				idDest = 'ad-' + _ad.name + '-dst';
				
				// Check breakpoint destination
				breakpoint = PX.test('rwd');
				idDestRWD = idDest + '-' + breakpoint;
				if (document.getElementById(idDestRWD)) {
					return { destination: idDestRWD };
				}
				
				// No breakpoint checked
				destination = document.getElementById(idDest);
				if (!destination) {
					PXU.log(logPrefix + ' : no destination element - ' + name, 'error');
					return false;
				}
				return { destination: idDest };
			}
			
			return false;
		},
		
		// Horizon media
		'horyzon_media': function () {
			SmartAdServer(_ad.datas.sas_pageid, _ad.datas.sas_formatid, _ad.datas.sas_target);
			_ad.loaded = true;
	        PXU.log(logPrefix + ' : loaded - ' + _ad.name, 'info');
		},
		
		// Shift each source to its own destination
		shift: function () {
			var name,
				source,
			    destination;
				
			for (name in PX.ads) {
				if (!PX.ads[name].loaded) {
				    PXU.log(logPrefix + ' : ad not loaded for shifting - ' + name, 'error');
					return;
				}
				destination = document.getElementById(PX.ads[name].destination);
				if (destination) {
					source = document.getElementById('ad-' + name + '-src');			
					if (source) {
						destination.appendChild(source);
						PXU.log(logPrefix + ' : shifted - ' + name + ' -> ' + PX.ads[name].destination, 'info');
					}
				}
			}
		}
	
	};
})();