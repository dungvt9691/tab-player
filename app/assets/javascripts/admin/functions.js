function number_format(number, decimals, dec_point, thousands_sep)
{
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
  prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
  sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
  dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
  s = '',
  toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);
    return '' + (Math.round(n * k) / k)
    .toFixed(prec);
  };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
  .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

alertify.set('notifier','position', 'bottom-left');
alertify.set('notifier','delay', 3);

showMessage = function(text, type){
  if(type == "success")
    alertify.success(text);
  else
    alertify.error(text);
}

function distinct(objectArray){
  var distinctResult = [];

  $.each(objectArray, function(i, currentObject){
    if(!exists(distinctResult, currentObject))
      distinctResult.push(currentObject);
  });

  return distinctResult;
}

function exists(arr, object){
  var id = object.id,
  result = false;
  $.each(arr, function(i, existingObject){
    if(existingObject.id === id) {
      result = true;
      return false;
    }
  });

  return result;
}