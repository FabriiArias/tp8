function cargarAutores() {
    fetch('/genero')
        .then(response => response.json())
        .then(data => {
            const selectGeneros = document.getElementById('select-generos');
            selectGeneros.innerHTML = ''; // limpiar select

            data.forEach(element => {
                const option = document.createElement('option');
                option.value = element.descripcion;
                option.textContent = `${element.descripcion}`;
                selectGeneros.appendChild(option);
            });
        })
        .catch(err => {
            console.error('Error al cargar los wachines:', err);
        });
}
cargarAutores();

let nomGen = '';

document.addEventListener('DOMContentLoaded', () => {
    const seleccionar = document.getElementById('select-generos');
    seleccionar.addEventListener('change', (e) => {
        nomGen = e.target.value;
        //console.log('Genero seleccionado', nomGen);
    });
});

function buscar() {
    if (!nomGen) {
        console.error('No se ha seleccionado un genero.');
        return; // Evitar hacer la búsqueda si no hay autor seleccionado
    }

    fetch(`/cd?generos=${nomGen}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            //console.log('Resultados:', data);
            const listaGeneros = document.getElementById('lista-generos');
            listaGeneros.innerHTML = '';

            if (data.length === 0) {
                listaGeneros.innerHTML = `<li>No se encontraron autores con mas del 
                50% de participacion en este libro.</li>`;
                return;
            }

            data.forEach(autor => {

                link = buscarBiblio(autor.nombre)
                listaGeneros.innerHTML += `
                    <div class="cont-biblio">
                        <a href="${link}" target="_blank" title="Ir a la biografia"> ${autor.nombre} </a>
                    </div>`
            });
        })
        .catch(err => {
            console.error('Error al buscar:', err);
        });
}

function buscarBiblio(nmb) {
    let link = '';
    if (nmb == 'Gabriel García Márquez') {
        return link = 'https://es.wikipedia.org/wiki/Gabriel_Garc%C3%ADa_M%C3%A1rquez';
    } else if (nmb == 'Julio Cortázar') {
        return link = 'https://es.wikipedia.org/wiki/Julio_Cort%C3%A1zar';
    } else if (nmb == 'Pablo Neruda') {
        return link = 'https://es.wikipedia.org/wiki/Pablo_Neruda';
    } else if (nmb == 'Isabel Allende') {
        return link = 'https://es.wikipedia.org/wiki/Isabel_Allende';
    } else if (nmb == 'Jorge Luis Borges') {
        return link = 'https://es.wikipedia.org/wiki/Jorge_Luis_Borges';
    } else if (nmb == 'Mario Vargas Llosa') {
        return link = 'https://es.wikipedia.org/wiki/Mario_Vargas_Llosa';
    } else if (nmb == 'Octavio Paz') {
        return link = 'https://es.wikipedia.org/wiki/Octavio_Paz';
    } else if (nmb == 'Gabriela Mistral') {
        return link = 'https://es.wikipedia.org/wiki/Gabriela_Mistral';
    } else if (nmb == 'Laura Esquivel') {
        return link = 'https://es.wikipedia.org/wiki/Laura_Esquivel';
    } else if (nmb == 'Claudio Magris') {
        return link = 'https://es.wikipedia.org/wiki/Claudio_Magris';
    } else {
        return link = '#';
    }
}