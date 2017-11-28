function Post() {
    function bindEvent() {
      $(".student_edit").click(function(e) {
        console.log('edit');
        var params = {
          id: $(".id").val(),
          name: $(".name").val(),
          class:$(".class").val(),
          idStudent: $(".idStudent").val(),
          phoneNumber:$(".phoneNumber").val(),
          birthday:$(".birthday").val(),
          where:$(".where").val(),
          password:$(".password").val(),
          updatedAt:$(".updatedAt").val()
        };
        var base_url = location.protocol + "//" + document.domain + ":" + location.port;
  
        $.ajax({
          url: base_url + "/admin/student/edit",
          type: "PUT",
          data: params,
          dataType: "json",
          success: function(res) {
            if (res && res.status_code == 200) {
              alert("Đã cập nhập thông tin sinh viên");
              location.reload();
            }
          }
        });
      });
      $(".student_delete").click(function(e){
          var student_id = $(this).attr("student_id");
           console.log(student_id);
          var base_url = location.protocol + "//" + document.domain + ":" + location.port;
  
          $.ajax({
          url: base_url + "/admin/student/delete",
          type: "DELETE",
          data: {id:student_id},
          dataType: "json",
          success: function(res) {
              if (res && res.status_code == 200) {
              location.reload();
              }
          }
          });
  });
    }
    bindEvent();
  }
  $(document).ready(function() {
    new Post();
  });
  