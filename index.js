updateMenu();

$("#print").click(
  function () {
    updateDate();
    setTimeout(function () {
      $('.order').printThis({
        importCSS: true,
        importStyle: true,
        removeInline: false
    });
    },8000)


  }
)

$( ".items" ).selectable({
  selected: function(event, ui  ) {
      const childs = ui.selected.childNodes
      let id = 0;
      for (let child of childs) {
        if (child.type == 'button') {
          id = child.id;
          $("#"+id).css({"display":"inline"});

        }
      }

    },
    unselected: function( event, ui ) {
      const childs = ui.unselected.childNodes
      let id = 0;
      for (let child of childs) {
        if (child.type == 'button') {
          id = child.id;
          $("#"+id).css({"display":"none"});

        }
      }

  }

    });






const addBtns = $(".add-btn");
let orderCount = 0
for (const btn of addBtns) {
  btn.addEventListener('click', function () {
      orderCount += 1
      const item = btn.parentElement.dataset.name.replace(/-/g, ' ');
      const price = btn.parentElement.dataset.price;
      const newDiv  = "<tr><th scope='row' class='order-count'> "+orderCount+"</th><td>"
      + item
      +"</td><td class='itemPrice'>"
      + price
      +"</td><td class='countSection'><span class='itemCount'>1</span><span class='modifyCount' style='display:none'>"+
      "<input type='number' name='value' value='1' class='myValue' min='0'>"
      +"</span></td><td class='row-price' data-price="+price+">"
      + price
      +"</td></tr>"
      $("#order-table").append(newDiv)
      let chngBtns = $(".myValue")
      for (let btn of chngBtns) {
        $(btn).bind('keyup focusout keydown', function () {
          let btnParent = btn.parentElement
          let parentItem = btnParent.parentElement.childNodes
          let garndParent = btnParent.parentElement.parentElement
          for (let elm of parentItem) {
            if (elm.className == 'itemCount') {
              elm.innerHTML = btn.value;
              updateItemTotal(garndParent)
              updateTotal();
              $(btnParent).hide();
              $(elm).show();
              updateDate();
            }
          }
    });
      }
      //update total
      updateTotal();
      $(".total").show()
      $("#print").show()
      $(".itemCount").each(function () {
        let item = this;
        $(item).click(function () {
          $(item).hide();
          let parentItem = item.parentElement.childNodes
          for (let elm of parentItem) {
            if (elm.className == 'modifyCount') {
              $(elm).show();
            }
          }
        })

        })
    }
  )

}

$( function() {
    $( "#tabs" ).tabs();
  } );
  $("[type='number']").keypress(function (evt) {
      evt.preventDefault();
  });

function updateTotal() {
  let order = $('#order-table').children()
  let total = 0
  for (let item of order) {
    if (item.tagName == "TR") {
      for (let itemPrice of item.childNodes) {
        if(itemPrice.className == 'row-price')
        {
          let price = parseInt(itemPrice.dataset.price)
          total += price
          document.getElementById("tot").innerHTML = total
        }
      }

    }
  }
}
function updateItemTotal(row) {
  let qty = 0
  let price = 0
  for (var elem of row.childNodes) {
    if (elem.className == 'itemPrice') {
      price = parseInt(elem.innerHTML);

    }
    if(elem.className == 'countSection'){
      for (var item of elem.childNodes) {
        if (item.className == 'itemCount') {
          qty = parseInt(item.innerHTML);
          if (qty==0) {
            row.remove();
            updateCount();
            updateDate();
            return updateTotal();
          }
        }
      }

    }


  }
  for (var elem of row.childNodes) {
    if (elem.className == 'row-price' && qty != 0 && price !=0) {
      const newTotal = qty * price;
      elem.dataset.price = newTotal;
      elem.innerHTML = newTotal;
    }
  }

}

function updateCount() {
  let allOrders = $('.order-count')
  for (var i = 0; i < allOrders.length; i++) {
    allOrders[i].innerHTML = i+1
  }
  orderCount = allOrders.length
}

//get Date
function updateDate() {
  const dateNew = new Date();
  let yearNow = dateNew.getFullYear();
  let monthNow = dateNew.getMonth();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let dayNow = dateNew.getDate();
  let hoursNow = dateNew.getHours();
  let dayOrNight = 'AM'
  if (hoursNow>12) {
    hoursNow -= 12;
    dayOrNight = 'PM'
  }
  let minutesNow = dateNew.getMinutes();
  const fullDateNow = hoursNow + ":" + minutesNow + " "+ dayOrNight + " -- " + dayNow + " " + months[monthNow] + " " + yearNow
  document.getElementById("date").innerHTML = fullDateNow

}
updateDate();

//menu

function updateMenu() {
  const menu = {
    "sandwiches": {
      "item 1": {
        "name": "????????",
        "price": 10
      },
      "item 2": {
        "name": "?????? ??????",
        "price": 10
      },
      "item 3": {
        "name": "?????? ????????",
        "price": 15
      },
      "item 4": {
        "name": "?????? ????????",
        "price": 20
      },
      "item 5": {
        "name": "????????",
        "price": 15
      },
      "item 6": {
        "name": "???????? ?????? ????????????",
        "price": 20
      },
      "item 7": {
        "name": "???????? ?????? ????????",
        "price": 25
      },
      "item 8": {
        "name": "??????????????",
        "price": 15
      },
      "item 9": {
        "name": "??????????",
        "price": 10
      },
      "item 10": {
        "name": "?????????? ??????",
        "price": 20
      },
      "item 11": {
        "name": "?????? ??????????",
        "price": 20
      },
      "item 12": {
        "name": "?????????????? ??????????",
        "price": 10
      },
      "item 13": {
        "name": "?????????????? ?????????? ????????",
        "price": 15
      },
      "item 14": {
        "name": "???????? ?????????? ????????",
        "price": 5
      },
      "item 15": {
        "name": "???????? ?????????? ????????",
        "price": 10
      },
      "item 16": {
        "name": "???????????? ??????",
        "price": 18
      }
    },
    "drinks": {
      "item 1": {
        "name": "??????",
        "price": 5
      },
      "item 2": {
        "name": "???????? ????????",
        "price": 10
      },
      "item 3": {
        "name": "???????? ??????????????",
        "price": 15
      },
      "item 4": {
        "name": "?????????????? ????????",
        "price": 10
      },
      "item 5": {
        "name": "?????????????? ??????",
        "price": 15
      },
      "item 6": {
        "name": "??????????",
        "price": 18
      },
      "item 7": {
        "name": "????????????????",
        "price": 18
      },
      "item 8": {
        "name": "?????? ????????",
        "price": 20
      },
      "item 9": {
        "name": "?????? ???????? ??????????????????",
        "price": 20
      },
      "item 10": {
        "name": "?????????? ??????",
        "price": 20
      },
      "item 11": {
        "name": "?????? ????????????",
        "price": 15
      },
      "item 12": {
        "name": "?????? ???????? ????????",
        "price": 5
      },
      "item 13": {
        "name": "?????????? ????????????",
        "price": 5
      },
      "item 14": {
        "name": "???????? ?????????? ?????????? ?? ??????",
        "price": 15
      },
      "item 15": {
        "name": "???????? ????????",
        "price": 5
      },
      "item 16": {
        "name": "????????",
        "price": 8
      }
    }
  }
  //update Sandwiches
  const sandwiches = menu.sandwiches
  for (const itm in sandwiches) {
    let newItem = "<li class='item ui-widget-content' data-name="
    + sandwiches[itm].name.replace(/\s+/g, '-')
    + " data-price="
    + sandwiches[itm].price
    + "><p>"
    + sandwiches[itm].name
    + "</p> <button type='button' name='button' id="
    +sandwiches[itm].name.replace(/\s+/g, '')
    +" style='display:none' class='add-btn btn btn-secondary botn'>+</button></li>"
    $("#sandwiches").append(newItem);
  }

  //update drinks
  const drinks = menu.drinks
  for (const itm in drinks) {
    let newItem = "<li class='item ui-widget-content' data-name="
    + drinks[itm].name.replace(/\s+/g, '-')
    + " data-price="
    + drinks[itm].price
    + "><p>"
    + drinks[itm].name
    + "</p><button type='button' name='button' id="
    +drinks[itm].name.replace(/\s+/g, '')
    +" style='display:none' class='add-btn btn btn-secondary botn'>+</button></li>"
    $("#drinks").append(newItem);
  }
}



//print function test

/*function printDiv() {
      let data = document.getElementById('order').innerHTML
      var mywindow = window.open('', 'new div', 'height=400,width=600');

      mywindow.document.write('<html lang="en" dir="ltr"><head>')
      mywindow.document.write('<meta charset="utf-8">')
      mywindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1">')
      mywindow.document.write('<link rel="stylesheet" href="lib/jquery-ui/jquery-ui.css">')
      mywindow.document.write('<link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">')
      mywindow.document.write('<link rel="stylesheet" href="index.css">')
      mywindow.document.write('<link href="lib/bootstrap/css/bootstrap-grid.min.css" rel="stylesheet">')
      mywindow.document.write('</head><body><main>');
      mywindow.document.write(data);
      mywindow.document.write('</main></body></html>');
      mywindow.document.close();
      mywindow.focus();
      setTimeout(function(){
        mywindow.print();
        mywindow.close();

      },3000);

      return true;
}
printDiv();*/
