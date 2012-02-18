# Focus.js
Focus.js is a library to simulate focus on all the elements in DOM

## Updated to version 1.0.0

#### ChangeLog 1.3.0 :
    First commit

## Description

Focus.js has been created to simulate focus on all the elements in DOM.
The need to create this library emerged in a project that needed to be focused on any DOM element, but without having to add multiple events, as this may cause memory problems.

### Some benefits:

* Only 578bytes when [Gzipped](http://tcorral.github.com/Focus.js/versions/focus.min.gz).

[API documentation](/tcorral/Focus.js/tree/master/examples_and_documents/jsdoc/index.html)

[Examples](/tcorral/Focus.js/tree/master/examples_and_documents/index.html) to see for yourself!

## Usage

### Before using it:
Insert in your code:

	<script type="text/javascript" src="/path/to/your/js/libs/Focus.js"></script>

### Instance it:
	var oFocus = new Focus()
		oFocus.setOnFocus(function(oElement)
				{
					console.log(oElement);
				})
				.setBehaviour();

## Documentation

(Links will only work if you clone the repo.)

[API documentation](/tcorral/Focus.js/tree/master/examples_and_documents/jsdoc/index.html)

[Examples](/tcorral/Focus.js/tree/master/examples_and_documents/index.html) to see for yourself!

## License

Focus.js is licensed under the MIT license.
