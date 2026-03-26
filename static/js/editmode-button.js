// --- EDIT MODE ---

function openEditMode() {
    // aan en uit zetten van de is-editing class in css
    const isEditing = document.body.classList.toggle('is-editing');
    const btn = document.querySelector('.button--profile');
    
    // Selecteer alle elementen met het attribuut contenteditable
    const editableElements = document.querySelectorAll('[contenteditable]');

    editableElements.forEach(el => {
        if (isEditing) {
            el.contentEditable = "true";
        } else {
            el.contentEditable = "false";
        }
    });

    // als de class is editing true is veranderd de knop in opslaan en vice versa 
    if (isEditing) {
        btn.innerHTML = 'Opslaan<span>&#10003;</span>';
    } else {
        btn.innerHTML = 'Wijzig profiel ✎';
    }
}