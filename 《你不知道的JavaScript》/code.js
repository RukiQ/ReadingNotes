window.onload = function() {
  function foo(num) {
    console.log("foo:" + num);

    this.count++;
    console.log(this);
  }

  count = 0;

  var i; 
  for (var i=0; i<10; i++) {
    if (i>5) {
      foo(i);
    }
  }

  console.log(window.count);
}


