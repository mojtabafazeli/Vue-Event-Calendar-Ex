$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var title = button.data('title') // Extract info from data-* attributes
    var date = button.data('date') // Extract info from data-* attributes
    var time = button.data('time') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.title').val(title)
    try {
        modal.find('.date').val(new Date(date).toISOString().substr(0, 10));
    } catch (e) {
        modal.find('.date').val('');
    }

    modal.find('.time').val(time)
})