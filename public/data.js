$(document).ready(function(){
    alert('application started');

    getdata();

    $('.addbtn').click(function(){
         var task = $("#task").val();
       $.ajax({
           url:'/task/addtask',
           method:'post',
           dataType:'json',
           data:{'task':task},
           success:function(response){
               if(response.msg=='success'){
            //    $("#task").remove();
               alert('task added successfully');
               getdata();
               $('#task').val('')
               }else{
                   alert('some error occurred try again');
               }
           },
           error:function(response){
               alert('server error occured')
           }
       });
    });
    $(document).on('click','button.del',function(){
        var id = $(this).parent().find('button.del').val();
        // alert('delte',id)
        $.ajax({
            url:'/task/removetask',
            method:'delete',
            dataType:'json',
            data:{'id':id},
            success:function(response){
                if(response.msg=='success'){
                    alert('data deleted');
                    getdata();
                }else{
                    alert('data not get deleted');
                }
            },
            error:function(response){
                     alert('server error')   
            }
        });
    });
    function getdata(){
        $.ajax({
            url:'/task/gettask',
            method:'get',
            dataType:'json',
            success:function(response){
                 if(response.msg=='success'){
                     $('tr.taskrow').remove()
                     if(response.data==undefined || response.data==null || response.data==''){
                         $('.tblData').hide();
                     }else{
                        $('.tblData').show();
                     $.each(response.data,function(index,data){
                         var url = url+data._id;
                         index+=1;
            $('tbody').append("<tr class='taskrow'><td>"+ index +"</td><td>"+data.task+"</td><td>"+"<button class='del' value='"+data._id+"'>delete</button>"+"</td></tr>"); 
                     });
                 }
               }
            },
            error:function(response){
                alert('server error');
            }
        });
    }
});