<?php

class Carbon_Field_Slider extends Carbon_Field_Number {
	protected $default_step = 1;
	protected $current_text = 'Current value: %s';

	protected $step = 1;

	function template() {
		?>
		<input id="{{{ id }}}" type="hidden" name="{{{ name }}}" value="{{ value }}" class="regular-text" />

		<div class="label-holder">
			<?php printf($this->current_text, '<label class="slider-label">{{ value }}</label>'); ?>
		</div><!-- /.label-holder -->

		<div class="slider-holder">
			<div class="slider"></div>
		</div>
		<?php
	}

	function to_json($load) {
		$field_data = parent::to_json($load);

		$field_data = array_merge($field_data, array(
			'min' => is_numeric($this->min) ? $this->min : $this->default_min,
			'max' => is_numeric($this->max) ? $this->max : $this->default_max,
			'step' => is_numeric($this->step) ? $this->step : $this->default_step,
			'truncate' => is_int($this->truncate) ? $this->truncate : $this->default_truncate,
		));

		return $field_data;
	}

	function admin_enqueue_scripts() {
		$template_dir = get_template_directory_uri();

		# Include UI
		wp_enqueue_script('jquery-ui-slider');
		wp_enqueue_style('jquery-ui', '//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.min.css');

		# Enqueue JS
		crb_enqueue_script('carbon-field-Slider', $template_dir . '/includes/carbon-field-slider/js/field.js', array('carbon-fields'));
		
		# Enqueue CSS
		crb_enqueue_style('carbon-field-Slider', $template_dir . '/includes/carbon-field-slider/css/field.css');
	}

	function set_step($step) {
		$this->step = $step;
		return $this;
	}

	function set_current_text($current_text) {
		$this->current_text = $current_text;
		return $this;
	}
}