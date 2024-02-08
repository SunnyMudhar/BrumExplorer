alertModalContainer = document.getElementById(`alert-modal-container`);

function createAlertModal(alertText) {
  
    alertModalContainer.innerHTML = `
      <div class="modal fade" id="alert-modal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="alertModalLabel">Alert!</h5>
                <button type="button" class="btn-close btn-rounded" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ${alertText}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    </div>`

    var alertModal = bootstrap.Modal.getOrCreateInstance('#alert-modal');

    alertModal.show();
}

