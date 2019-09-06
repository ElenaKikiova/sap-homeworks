
var initialised = false;

function loadRecords() {
  $.get('/getRecords')
  .done(function(data){
    console.log(data);
    var list = $("#TShirtListBody");
    list.empty();
    var html = "";
    for(var i = 0; i < data.length; i++){
      html += "<tr>" +
      "<td>" + data[i].Name + "</td>" +
      "<td>" + data[i].Type + "</td>" +
      "<td>" + data[i].Size + "</td>" +
      "<td><button class='edit'>✎</button><button class='delete'>🗑</button>" +
      "</tr>";
    }
    list.html(html);
    if(initialised == false) {
      $("#TShirtList").DataTable({});
      initialised = true;
    }

  })
  .fail(function(){
    Swal.fire("Error!", "Can't load records", "error");
  })
}

loadRecords();

$("#add").on("click", function(){
  Swal.fire({
    title: "New t-shirt",
    html: "Name: <br><input id='name'><br>" +
    "Type: <br>" +
    "<select id='type'>" +
      "<option value='male'>male</option>" +
      "<option value='female'>female</option>" +
    "</select><br>" +
    "Size: <br>" +
    "<select id='size'>" +
      "<option value='xs'>xs</option>" +
      "<option value='sm'>sm</option>" +
      "<option value='m' selected>m</option>" +
      "<option value='l'>l</option>" +
      "<option value='xl'>xl</option>" +
      "<option value='xxl'>xxl</option>" +
    "</select><br>"
  })
  .then((result) => {
    if (result.value) {
      var info = {};
      info.Name = $("#name").val();
      if(info.Name == "") {
        Swal.fire("No name!", "Enter name for the t-shirt owner", "error");
      }
      else{
        info.Type = $("#type > option:selected").val();
        info.Size = $("#size > option:selected").val();
        console.log(info);

        Swal.fire('Adding...', '', 'info');

        $.post('/addRecord', info)
        .done(function() {
          Swal.fire('Done!', 'The t-shirt request has been added to the list', 'success');
          loadRecords();
        })
        .fail(function() {
          Swal.fire('Something went wrong!', 'Try again later', 'error');
        })
      }
    }
  })
})
