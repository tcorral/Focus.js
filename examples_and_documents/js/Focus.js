(function (win, doc, ns, _undefined_) {

    var Focus, isNative;

    if (ns === _undefined_) {
        ns = win;
    }

    /**
     * Check if function is native code
     * @return {Boolean}
     */
    isNative = function(fpCallback)
    {
        return fpCallback.toString().indexOf("[native code]") !== -1;
    };
    /**
     * Class that hijack the click on document and search for any element to be focus
     * @constructor
     * @class Focus
     * @name Focus
     * @author Tomas Corral Casas
     */
    Focus = function()
    {
        /**
         * Element that has the focus
         * @member Focus.prototype
         * @type {Object} DOM element
         */
        this.oActive = null;

        /**
         * Method to be executed when get a focus
         * This callback will get two arguments:
         * oPreviousActive is the element that was active before click on document
         * oActive is the element that has the focus after click on document
         * @member Focus.prototype
         */
        this.onFocus = function(oPreviousActive, oActive){};
    };

    Focus.prototype = {

        /**
         * Event handler to add new events to DOM elements
         * @memmber Focus.prototype
         */
        addEvent: function(oElement, sType, fpCallback)
        {
            if(!oElement ||
                typeof oElement.nodeName === "undefined" ||
                !sType ||
                typeof oElement["on" + sType] === "undefined" ||
                !fpCallback ||
                typeof fpCallback !== "function"
                )
            {
                return false;
            }

            if(oElement.addEventListener && isNative(oElement.addEventListener))
            {
                oElement.addEventListener(sType, fpCallback, false);
                return true;
            }else if(oElement.attachEvent && isNative(oElement.attachEvent))
            {
                oElement.attachEvent('on' + sType, fpCallback);
                return true;
            }
            return false;
        },

        /**
         * Traverse DOM tree to find any element with 'focusable' class
         * @member Focus.prototype
         */
        searchForFocusable: function(oElement)
        {
            while(oElement !== document && oElement.className.indexOf('focusable') === -1)
            {
                oElement = oElement.parentNode;
            }

            if(oElement === document)
            {
                return null;
            }

            return oElement;

        },

        /**
         * Returns active element
         * @member Focus.prototype
         */
        getActive: function()
        {
            return this.oActive;
        },

        /**
         * Sets the onFocus callback to be executed when get the focus
         * @member Focus.prototype
         */
        setOnFocus: function(fpOnFocus)
        {
            this.onFocus = fpOnFocus;
            return this;
        },

        /**
         * Sets the handler to hijack the click on document
         * @member Focus.prototype
         */
        setBehaviour: function()
        {
            var self = this;
            this.addEvent(document, 'click', function(eEvent)
            {
                var oPrevActive = self.oActive;
                var oActive = self.searchForFocusable(eEvent.target);
                if(oActive === null)
                {
                    return;
                }
                self.oActive = oActive;
                self.onFocus(oPrevActive, self.oActive);
                oPrevActive = null;
                oActive = null;
            });
        }
    };
    /*
     * Expose Focus to namespace
     */
    ns.Focus = Focus;
}(window, document));