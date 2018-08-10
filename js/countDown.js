function countDown() {

	obj.hundredths -= 1;
  
	if ( obj.hundredths < 0 ) {
		obj.tenths -= 1;
		obj.hundredths = 9;
	}
	if ( obj.tenths < 0 ) {
	  	obj.minutes -= 1;
	  	obj.tenths = 5;
	}
	if ( obj.minutes < 0 ) { return resign(); }

	clockToUpdate.innerHTML =  
		obj.minutes + ':' + obj.tenths + obj.hundredths;
}