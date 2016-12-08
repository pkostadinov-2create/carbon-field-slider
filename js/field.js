window.carbon = window.carbon || {};

(function($) {
	var carbon = window.carbon;

	if (typeof carbon.fields === 'undefined') {
		return false;
	}

	carbon.fields.Model.Slider = carbon.fields.Model.extend({
		/*
		 * The validate method is an internal Backbone method.
		 * It will check if the field model data is valid.
		 * Used to check required fields
		 *
		 * @see http://backbonejs.org/#Model-validate
		 */
		validate: function(attrs, options) {
			var hasErrors = false;
			var _this = this;
			var min = _this.get('min');
			var max = _this.get('max');
			var step = _this.get('step');
			var value = attrs.value;

			var testStepValidation = ( value - min ) / step;

			if ( value === '' ) {
				hasErrors = crbl10n.message_required_field;
			} else if ( isNaN(value) ) {
				hasErrors = crbl10n.message_form_validation_failed;
			} else if ( min > value || value > max ) {
				hasErrors = crbl10n.message_form_validation_failed;
			} else if ( testStepValidation !== parseInt( testStepValidation, 10 ) ) {
				hasErrors = crbl10n.message_form_validation_failed;
			}

			return hasErrors;
		}
	});

	carbon.fields.View.Slider = carbon.fields.View.extend({
		// Add the events from the parent view and also include new ones
		events: function() {
			return _.extend({}, carbon.fields.View.prototype.events, {
				'slidechange .slider-holder .slider': 'updateValue',
				'slide .slider-holder .slider': 'updateValue',
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
			var value = model.get('value');

			_this.$('input').attr('min', min);
			_this.$('input').attr('max', max);

			_this.$('.slider-holder .slider').slider({
				min: min,
				max: max,
				step: step,
				value: value,
			});
		},

		updateValue: function(event, ui) {
			var $input = this.$('input');
			var $label = this.$('label');
			var value = ui.value;

			this.model.set('value', value);
			$input.val(value);
			$label.text(value);

			this.reValidate;
		},
	});

}(jQuery));