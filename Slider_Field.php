<?php

namespace Carbon_Fields\Field;

class Slider_Field extends Number_Field {
	protected $default_step = 1;
	protected $current_text = 'Current value: %s';

	protected $step = 1;

	function template() {
		?>
		<input id="{{{ id }}}" type="hidden" name="{{{ name }}}" value="{{ value }}" max="{{ max }}" min="{{ min }}" step="{{ step }}" pattern="[0-9]*" class="regular-text" />

		<div class="label-holder">
			<?php printf($this->current_text, '<label class="slider-label">{{ value }}</label>'); ?>
		</div><!-- /.label-holder -->

		<div class="slider-holder">
			<div class="slider"></div>
		</div>
		<?php
	}

	static function admin_enqueue_scripts() {
		$template_dir = get_template_directory_uri();

		// Get the current url for the carbon-fields-slider, regardless of the location
		$template_dir .= str_replace(wp_normalize_path(get_template_directory()), '', wp_normalize_path(__DIR__));

		# Include UI
		wp_enqueue_script('jquery-ui-slider');
		wp_enqueue_style('jquery-ui', '//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.min.css');

		# Enqueue JS
		crb_enqueue_script('carbon-field-Slider', $template_dir . '/js/field.js', array('carbon-fields'));

		# Enqueue CSS
		crb_enqueue_style('carbon-field-Slider', $template_dir . '/css/field.css');
	}

	function set_current_text($current_text) {
		$this->current_text = $current_text;
		return $this;
	}
}