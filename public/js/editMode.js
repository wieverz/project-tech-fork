
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

        // Maak alle lijst-items bewerkbaar (behalve de important-qualities)
        document.querySelectorAll('.qualities li').forEach(li => {
            li.contentEditable = isEditing;
        });
        
        // Voeg kruisjes toe aan kwaliteiten als ze er nog niet staan
        document.querySelectorAll('.qualities li').forEach(li => {
            if (!li.querySelector('.delete-tag')) {
                const span = document.createElement('span');
                span.className = 'delete-tag';
                span.innerHTML = '×';
                span.contentEditable = false; // Kruisje zelf niet bewerkbaar maken
                span.onclick = function() { this.parentElement.remove(); };
                li.appendChild(span);
            }
        });
    });