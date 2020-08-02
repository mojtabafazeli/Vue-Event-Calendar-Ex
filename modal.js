$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var index = button.data('index') // Extract info from data-* attributes
    var date = button.data('date') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.title').val(app.getEventTitle(index))
    try {
        modal.find('.date').val(new Date(date).toISOString().substr(0, 10));
    } catch (e) {
        modal.find('.date').val('');
    }

    try {
        modal.find('.time').val(app.getEventTime(index))
    } catch (e) {
        modal.find('.time').val('');
    }

    if ($('.title').val() == '') {
        $('.add-update').html('Add event')
        $('.delete').hide();
    } else {
        $('.add-update').html('Update event')
        $('.delete').show();
    }
})

$('#myModal').hide();