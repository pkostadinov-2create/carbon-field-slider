window.carbon = window.carbon || {};

(function($) {
	var carbon = window.carbon;

	if (typeof carbon.fields === 'undefined') {
		return false;
	}

	carbon.fields.View.Slider = carbon.fields.View.extend({
		// Add the events from the parent view and also include new ones
		events: function() {
			return _.extend({}, carbon.fields.View.prototype.events, {
				'slidechange .slider-holder .slider': 'checkValue',
			});
		},

		initialize: function() {
			carbon.fields.View.prototype.initialize.apply(this);

			this.on('field:rendered', this.initSliderField);
		},

		initSliderField: function() {
			var _this = this;
			var model = this.model;
			var min = model.get('min');
			var max = model.get('max');
			var step = model.get('step');
			var truncate = model.get('truncate');
			var value = model.get('value');

			if ( truncate > 0 ) {
				_this.$('input').attr('step', 'any');
			};

			_this.$('input').attr('min', min);
			_this.$('input').attr('max', max);

			_this.$('.slider-holder .slider').slider({
				min: min,
				max: max,
				step: step,
				value: value,
			});
		},

		truncateValue: function(number, truncate) {
			truncate = truncate || 0;
			truncate = Math.pow(10, truncate);
			if ( number >= 0 ) {
				return Math.floor(number * truncate) / truncate;
			} else {
				return Math.ceil(number * truncate) / truncate;
			};
		},

		checkValue: function(event) {
			var $input = this.$('input');
			var $label = this.$('label');
			var $slider = this.$('.slider');
			var value = $slider.slider( "value" );

			console.log(value);

			var min = this.model.get('min');
			var max = this.model.get('max');
			var truncate = this.model.get('truncate');

			var floatval = parseFloat(value);
			floatval = this.truncateValue(floatval, truncate);

			if ( !isNaN(floatval) && min <= floatval && floatval <= max ) {
				value = floatval;
			} else {
				value = '';
			}

			this.model.set('value', value);
			$input.val(value);
			$label.text(value);
		},
	});

}(jQuery));