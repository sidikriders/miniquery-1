/*!
 * miniquery
 */
 function miniquery(input, modifier) {
   function hide() {
     DOM.hide(input)
   }
   function show() {
     DOM.show(input)
   }
   function addClass() {
     DOM.addClass(input, modifier)
   }
   function removeClass() {
     DOM.removeClass(input, modifier)
   }
   function on(action, callback) {
     EventDispatcher.trigger(input, action, callback)
   }
   function trigger(action, callback) {
     EventDispatcher.trigger(input, action, callback)
   }
   function ajax(obj) {
     AjaxWrapper.request(obj)
   }
   return {
     this: SweetSelector.select(input),
     hide: hide,
     show: show,
     addClass: addClass,
     removeClass: removeClass,
     on: on,
     trigger: on,
     ajax: ajax
   }
 }

 let $ = miniquery;
/*
 * ----------------------------------------------------------------------------
 * Element Selector
 * ----------------------------------------------------------------------------
 */
let SweetSelector = {
  select: function(input) {
   return document.querySelectorAll(input)
 }
}


/*
 * -----------------------------------------------------------------------------
 * DOM Manipulators
 * -----------------------------------------------------------------------------
 */

 let DOM = {
   hide: function(input) {
     let target = SweetSelector.select(input)
     let arr = [].slice.call(target);
     arr.forEach( x=> {
       x.style.display = 'none'
     })
     console.log('berhasil sembunyi');
   },
   show: function(input) {
     let target = SweetSelector.select(input)
     let arr = [].slice.call(target);
     arr.forEach( x=> {
       x.style.display = ''
     })
     console.log('berhasil muncul kembali');
   },
   addClass: (kelas, modifier) => {
     let target = SweetSelector.select(kelas)
     let arr = [].slice.call(target);
     for (let i = 0; i<arr.length;i++) {
       arr[i].classList.add(modifier);
     }
   },
   removeClass: (kelas, modifier) => {
     let target = SweetSelector.select(kelas)
     console.log(`dari remove ------------ ${target}`);
     let arr = [].slice.call(target);
     for (let i=0;i<arr.length;i++) {
       arr[i].classList.remove(modifier)
     }
   }
 }

/*
 * ----------------------------------------------------------------------------
 * Event Dispatcher
 * ----------------------------------------------------------------------------
 */

let EventDispatcher = {
  on: (kelas, action, callback) => {
    EventDispatcher.trigger(kelas, action, callback)
  },
  trigger: (kelas, action, callback) => {
    let event = new Event(action)
    let target = SweetSelector.select(kelas)
    console.log(target);
    target[0].addEventListener(action, callback)
    target[0].dispatchEvent(event)
  }
}

/*
 * ----------------------------------------------------------------------------
 * AJAX Wrapper
 * ----------------------------------------------------------------------------
 */

let AjaxWrapper = {
  request: (obj) => {
    var request = new XMLHttpRequest();
    request.open(obj.type, obj.url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = request.responseText;
        obj.success(data)
      } else {
        // We reached our target server, but it returned an error
        obj.fail()
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      obj.fail()
    };
    request.send();
  }
}

/*
 * ----------------------------------------------------------------------------
 * Alias miniquery
 * ----------------------------------------------------------------------------
 */
