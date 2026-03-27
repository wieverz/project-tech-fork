
    const editModeBtn = document.getElementById('edit-mode-toggle');
    
    editModeBtn.addEventListener('click', () => {
        const isEditing = document.body.classList.toggle('is-editing');
        
        // Verander aanpassen knop tekst en kleur
        editModeBtn.textContent = isEditing ? "Opslaan" : "Aanpassen";
        editModeBtn.style.backgroundColor = isEditing ? "#28a745" : "var(--accentColorRed)";

        // Maak alle elementen met een ID of in een lijst bewerkbaar
        const editableIds = ['userName', 'rol', 'bio'];
        editableIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.contentEditable = isEditing;
        });

        // Zoekt alle lijstjes die tekst bevatten die aangepastt moeten kunnen worden
        const profileLists = document.querySelectorAll('.qualities li, .important-qualities li, .nameRole li');
            
        profileLists.forEach(li => {
            li.contentEditable = isEditing;
        });

        // Alleen voor gouden tags voegen we kruisjes toe
        document.querySelectorAll('.qualities li').forEach(li => {
            if (!li.querySelector('.delete-tag')) {
                const span = document.createElement('span');
                span.className = 'delete-tag';
                span.innerHTML = '×';
                span.contentEditable = false; 
                span.onclick = function() { this.parentElement.remove(); };
                li.appendChild(span);
            }
        });
            });