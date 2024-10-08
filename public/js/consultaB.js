function cargarLibros(){
    fetch('/libro')
    .then(response => response.json())
    .then(data => {
        const selectLibros = document.getElementById('select-libros');
        selectLibros.innerHTML = ''; // limpiar select

        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element.titulo;
            option.textContent = `${element.titulo}`;
            selectLibros.appendChild(option);
        });
    })
    .catch(err => {
        console.error('Error al cargar los libros:', err);
    });
}
cargarLibros();

let tituloLibro = '';

document.addEventListener('DOMContentLoaded', () => {
    const seleccionar = document.getElementById('select-libros');
    seleccionar.addEventListener('change', (e) => {
        tituloLibro = e.target.value;
        console.log('Titulo:', tituloLibro);
    });
})

function buscar() {
    if (!tituloLibro) {
        console.error('No se ha seleccionado un libro.');
        return; // Evitar hacer la búsqueda si no hay autor seleccionado
    }

    fetch(`/cb?titulo=${tituloLibro}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Resultados:', data);
            const listaAutores = document.getElementById('lista-autores');
            listaAutores.innerHTML = ''; 

            if (data.length === 0) {
                listaAutores.innerHTML = '<li>No se encontraron autores para este libro.</li>';
                return;
            }

            data.forEach(autor => {
                listaAutores.innerHTML += `
                <div class="grilla-autores">
                   <p>${autor.nombre}</p>
                   <img src="${autor.foto}"></img>
                </div>`
            });
        })
        .catch(err => {
            console.error('Error al buscar:', err);
        });
}
