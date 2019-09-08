
var initialised = false;

function loadRecords() {
  $.get('/getRecords')
  .done(function(data){
    console.log(data);
    var list = $("#TShirtListBody");
    list.empty();
    var html = "";
    for(var i = 0; i < data.length; i++){
      html += "<tr data-id='" + data[i]._id + "'>" +
      "<td class='name'>" + data[i].Name + "</td>" +
      "<td class='type'>" + data[i].Type + "</td>" +
      "<td class='size'>" + data[i].Size + "</td>" +
      "<td><button class='edit'>✎</button><button class='delete'>🗑</button>" +
      "</tr>";
    }
    list.html(html);
    if(initialised == false) {
      $("#TShirtList").DataTable({});
      initialised = true;
    }
    $(".edit").on("click", editRecord);
    $(".delete").on("click", deleteRecord);
  })
  .fail(function(){
    Swal.fire("Error!", "Can't load records", "error");
  })
}

var colors =  [
  { name: "white-102", color: "#ffffff" },
  { name: "ash-300", color: "#cccccc" },
  { name: "light grey-300", color: "#aaaaaa" },
  { name: "grey melange-350", color: "#797979" },
  { name: "dark grey-384", color: "#565656" },
  { name: "mouse grey-38", color: "#242424" },
  { name: "deep black-309", color: "#000000" },
  { name: "orchid pink-136", color: "#ff6699" },
  { name: "fuschia-140", color: "#fc3398" },
  { name: "chili", color: "#79131c" },
];

var tshirtForm = "Name: <br><input id='name'><br>" +
"Type: <br>" +
"<select id='type'>" +
  "<option value='male'>male</option>" +
  "<option value='female'>female</option>" +
"</select><br>" +
"Size: <br>" +
"<select id='size'>" +
  "<option value='xs'>xs</option>" +
  "<option value='sm'>sm</option>" +
  "<option value='m'>m</option>" +
  "<option value='l'>l</option>" +
  "<option value='xl'>xl</option>" +
  "<option value='xxl'>xxl</option>" +
"</select><br>" +
"Color: <br><div style='display: flex; flex-wrap: 1'>";
for(var i = 0; i < colors.length; i++){
  tshirtForm += "<div class='colorRadio' style='background: " + colors[i].color + "'>";
  tshirtForm += "<input type='radio' name='color' value='" + colors[i].name + "'>";
  tshirtForm += "</div>";
}
tshirtForm += "</div>";

function setColorOnClick(){
  $("div.colorRadio").on("click", function(){
    $(this).find("input[name='color']").prop("checked", true);
    console.log("clicked");
    console.log($(this).find("input[name='color']"));
  });
  console.log("clickable");
}

loadRecords();

$("#add").on("click", function(){
  Swal.fire({
    title: "New t-shirt",
    html: tshirtForm,
    showCancelButton: true
  })

  setColorOnClick();

  $(".swal2-confirm").html("Add").on("click", function(){
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
    });
});

function editRecord(){
  console.log(this);

  var row = $(this).parent().parent();
  var id = row.data("id");

  console.log(row, id);

  info = {};
  info.id = id;
  info.Name = row.find(".name").html();
  info.Type = row.find(".type").html();
  info.Size = row.find(".size").html();

  Swal.fire({
    title: "Edit record",
    html: tshirtForm,
    showCancelButton: true
  })

  setColorOnClick();

  $("#name").val(info.Name);
  $("#type").val(info.Type);
  $("#size").val(info.Size);

  $(".swal2-confirm").html("Edit").on("click", function(){
    info.Name = $("#name").val();
    if(info.Name == "") {
      Swal.fire("No name!", "Enter name for the t-shirt owner", "error");
    }
    else{
      info.Type = $("#type > option:selected").val();
      info.Size = $("#size > option:selected").val();
      console.log(info);

      Swal.fire('Saving changes...', '', 'info');

      $.post('/editRecord', info)
      .done(function() {
        Swal.fire('Done!', 'The changes were applied', 'success');
        loadRecords();
      })
      .fail(function() {
        Swal.fire('Something went wrong!', 'Try again later', 'error');
      })
    }
  });

}

function deleteRecord(){
  var id = $(this).parent().parent().data("id");

  Swal.fire({
    type: "warning",
    title: "Do you really want to delete this tshirt?",
    showCancelButton: true
  })
  .then(function(result){
    if(result.value){
      console.log("Delete ", id);

      $.post("/deleteRecord", {id: id})
      .done(function() {
        Swal.fire('Done!', 'Deleted', 'success');
        loadRecords();
      })
      .fail(function() {
        Swal.fire('Something went wrong!', 'Try again later', 'error');
      })
    }
  });
}
