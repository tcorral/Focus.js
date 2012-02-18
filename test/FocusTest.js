(function (win, doc, ns, _undefined_) {
	if (ns === _undefined_) {
		ns = win;
	}
	function setup()
	{
		this.oFocus = new ns.Focus();
	}
	function teardown()
	{
		delete this.oFocus;
	}
	TestCase("FocusConstructorTest", sinon.testCase({
		setUp: function()
		{
			setup.call(this);
		},
		tearDown: function()
		{
			teardown.call(this);
		},
		'test should check that Focus class exist': function()
		{
			assertFunction(ns.Focus);
		},
		'test Focus class expects no params': function()
		{
			assertEquals(0, ns.Focus.length);
		},
		'test should check that oActive element is null by default': function()
		{
			assertNull(this.oFocus.oActive)
		},
		'test should check that onFocus is a function': function()
		{
			assertFunction(this.oFocus.onFocus);
		}
	}));
	TestCase("FocusAddEventTest", sinon.testCase({
		setUp: function()
		{
			setup.call(this);
		},
		tearDown: function()
		{
			teardown.call(this);
		},
		'test should check that addEvent method exist': function()
		{
			assertFunction(this.oFocus.addEvent);
		},
		'test addEvent method expects three params': function()
		{
			assertEquals(3, this.oFocus.addEvent.length);
		},
		'test should check that must return false if addEvent does not receive any argument': function()
		{
			var bResult;

			bResult = this.oFocus.addEvent();

			assertFalse(bResult);
		},
		'test should check that must return false if first parameter is null': function()
		{
			var sType = 'click';
			var fpCallback = function(){};
			var bResult;

			bResult = this.oFocus.addEvent(null, sType, fpCallback);

			assertFalse(bResult);
		},
		'test should check that must return false if first parameter is not an DOM like element': function()
		{
			var sType = 'click';
			var fpCallback = function(){};
			var bResult;

			bResult = this.oFocus.addEvent({}, sType, fpCallback);

			assertFalse(bResult);
		},
		'test should check that must return false if second parameter is null': function()
		{
			var fpCallback = function(){};
			var bResult;

			bResult = this.oFocus.addEvent(document.body, null, fpCallback);

			assertFalse(bResult);
		},
		'test should check that must return false if second parameter is not a valid system event': function()
		{
			var fpCallback = function(){};
			var bResult;

			bResult = this.oFocus.addEvent(document.body, 'test', fpCallback);

			assertFalse(bResult);
		},
		'test should check that must return false if third parameter is null': function()
		{
			var bResult;

			bResult = this.oFocus.addEvent(document.body, 'click', null);

			assertFalse(bResult);
		},
		'test should check that must return false if third parameter is not a function': function()
		{
			var bResult;
			var oObject = {};

			bResult = this.oFocus.addEvent(document.body, 'click', oObject);

			assertFalse(bResult);
		},
		'test should check that must return false if addEventLister and attachEvent does not exist': function()
		{
			var fpCallback = function(){};
			var fpAddEventListener = document.body.addEventListener;
			var fpAttachEvent = document.body.attachEvent;
			document.body.addEventListener = _undefined_;
			document.body.attachEvent = _undefined_;
			var bResult;

			bResult = this.oFocus.addEvent(document.body, 'click', fpCallback);

			assertFalse(bResult);

			document.body.addEventListener = fpAddEventListener;
			document.body.attachEvent = fpAttachEvent;
		},
		'test should check that must return false if attachEvent does not exist and addEventListener exist but is not native code': function()
		{
			var fpCallback = function(){};
			var fpAddEventListener = document.body.addEventListener;
			var fpAttachEvent = document.body.attachEvent;
			document.body.addEventListener = function(){};
			document.body.attachEvent = _undefined_;
			var bResult;

			bResult = this.oFocus.addEvent(document.body, 'click', fpCallback);

			assertFalse(bResult);

			document.body.addEventListener = fpAddEventListener;
			document.body.attachEvent = fpAttachEvent;
		},
		'test should check that must return true if addEventListener exist and is native code and attachEvent does not exist': function()
		{
			var bResult;
			var fpCallback = function(){};
			var fpAttachEvent = document.body.attachEvent;
			document.body.attachEvent = _undefined_;

			bResult = this.oFocus.addEvent(document.body, 'click', fpCallback);

			assertTrue(bResult);
			document.body.attachEvent = fpAttachEvent;
		},
		'test should check that must return false if attachEvent and addEventListener does not exist': function()
		{
			var fpCallback = function(){};
			var fpAddEventListener = document.body.addEventListener;
			var fpAttachEvent = document.body.attachEvent;
			document.body.addEventListener = _undefined_;
			document.body.attachEvent = _undefined_;
			var bResult;

			bResult = this.oFocus.addEvent(document.body, 'click', fpCallback);

			assertFalse(bResult);

			document.body.addEventListener = fpAddEventListener;
			document.body.attachEvent = fpAttachEvent;
		},
		'test should check that must return true if attachEvent exist and is native code and addEventListener does not exist': function()
		{
			var bResult;
			var fpCallback = function(){};
			var fpAddEventListener = document.body.addEventListener;
			document.body.addEventListener = function() { "[native code]"};

			bResult = this.oFocus.addEvent(document.body, 'click', fpCallback);

			assertTrue(bResult);

			document.body.addEventListener = fpAddEventListener;
		}
	}));
	TestCase("FocusSearchForFocusableTest", sinon.testCase({
		setUp: function()
		{
			setup.call(this);
		},
		tearDown: function()
		{
			teardown.call(this);
		},
		'test should check searchForFocusable method exist': function()
		{
			assertFunction(this.oFocus.searchForFocusable);
		},
		'test searchForFocusable method expects one param': function()
		{
			assertEquals(1, this.oFocus.searchForFocusable.length);
		},
		'test should traverse DOM elements until find one element with class focusable': function()
		{
			/*:DOC += <div>
			 <div>
			 <div class='focusable' id='focusable'>
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/
			var oResult;

			oResult = this.oFocus.searchForFocusable(document.getElementById("test"));

			assertSame(document.getElementById("focusable"), oResult);
		},
		'test should return null if when traversing DOM elements no class focusable has been found': function()
		{
			/*:DOC += <div>
			 <div>
			 <div id='focusable'>
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/
			var oResult;

			oResult = this.oFocus.searchForFocusable(document.getElementById("test"));

			assertNull(oResult);
		}
	}));
	TestCase("FocusGetActiveTest", sinon.testCase({
		setUp: function()
		{
			/*:DOC += <div>
			 <div>
			 <div id='focusable' id="focus">
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/
			setup.call(this);
		},
		tearDown: function()
		{
			teardown.call(this);
		},
		'test should check getActive method exist': function()
		{
			assertFunction(this.oFocus.getActive);
		},
		'test getActive method expects no params': function()
		{
			assertEquals(0, this.oFocus.getActive.length);
		},
		'test should return oActive element': function()
		{
			var oResult;
			var oFocusable = document.getElementById("focus");
			this.oFocus.searchForFocusable(document.getElementById("test"));

			oResult = this.oFocus.getActive();

			assertSame(oFocusable, this.oFocus.oActive);
		}
	}));
	TestCase("FocusSetOnFocusTest", sinon.testCase({
		setUp: function()
		{
			setup.call(this);
		},
		tearDown: function()
		{
			teardown.call(this);
		},
		'test should check that setOnFocus method exist': function()
		{
			assertFunction(this.oFocus.setOnFocus);
		},
		'test setOnFocus method expect one param': function()
		{
			assertEquals(1, this.oFocus.setOnFocus.length);
		}
	}));
	TestCase("FocusSetBehaviourTest", sinon.testCase({
		setUp: function()
		{
			setup.call(this);
			this.stubAddEvent = sinon.stub(this.oFocus, 'addEvent');
			sinon.spy(this.oFocus, "searchForFocusable");
		},
		tearDown: function()
		{
			this.oFocus.searchForFocusable.restore();
			this.oFocus.addEvent.restore();
			teardown.call(this);
		},
		'test should check that setBehaviour method exist': function()
		{
			assertFunction(this.oFocus.setBehaviour);
		},
		'test setBehaviour method expects no params': function()
		{
			assertEquals(0, this.oFocus.setBehaviour.length);
		},
		'test should check that setBehaviour calls addEvent method one time': function()
		{
			this.oFocus.setBehaviour();

			assertEquals(1, this.oFocus.addEvent.callCount);
		},
		'test should check that when yielding the callback in addEvent method searchForFocusable is called': function()
		{
			/*:DOC += <div>
			 <div>
			 <div id='focusable'>
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/

			this.stubAddEvent.yields({
				target: document.getElementById("test")
			});

			this.oFocus.setBehaviour();

			assertEquals(1, this.oFocus.searchForFocusable.callCount);
		},
		'test should check that when yielding the callback in addEvent method onFocus will be called': function()
		{
			/*:DOC += <div>
			 <div>
			 <div class='focusable'>
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/

			this.stubAddEvent.yields({
				target: document.getElementById("test")
			});
			this.oFocus.onFocus = sinon.stub();

			this.oFocus.setBehaviour();

			assertEquals(1, this.oFocus.onFocus.callCount);
		},
		'test should change oActive property when yielding addEvent': function()
		{
			/*:DOC += <div>
			 <div>
			 <div class='focusable' id="focus">
			 <div>
			 <span id='test'>Test</span>
			 </div>
			 </div>
			 </div>
			 </div>*/

			this.stubAddEvent.yields({
				target: document.getElementById("test")
			});

			this.oFocus.setBehaviour();

			assertSame(document.getElementById("focus"), this.oFocus.oActive);
		}
	}));
}(window, document));