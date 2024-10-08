function cargarGeneros(){
    fetch('/autor')
    .then(response => response.json())
    .then(data => {
        const selectAutores = document.getElementById('select-autores');
        selectAutores.innerHTML = ''; // limpiar select

        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element.documento;
            option.textContent = `${element.nombre}`;
            selectAutores.appendChild(option);
        });
    })
    .catch(err => {
        console.error('Error al cargar los wachines:', err);
    });
}
cargarGeneros();

let documentoAutor = '';

document.addEventListener('DOMContentLoaded', () => {
    const seleccionar = document.getElementById('select-autores');
    seleccionar.addEventListener('change', (e) => {
        documentoAutor = e.target.value;
        console.log('Dni del auutor:', documentoAutor);
    });
})

function buscar() {
    if (!documentoAutor) {
        console.error('No se ha seleccionado un autor.');
        return; // Evitar hacer la búsqueda si no hay autor seleccionado
    }

    fetch(`/ca?documento=${documentoAutor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Resultados:', data);
            const listaLibros = document.getElementById('lista-libros');
            listaLibros.innerHTML = ''; 

            if (data.length === 0) {
                listaLibros.innerHTML = '<li>No se encontraron libros para este autor.</li>';
                return;
            }

            data.forEach(libro => {
                listaLibros.innerHTML += `
                    <div class="cont-result"> 
                        <h4 class="subTitulo">Titulo: </h4> 
                        <p> ${libro.titulo}</p> 
                    </div>
                    <div class="cont-result">
                        <h4 class="subTitulo">Descripcion: </h4>
                        <p> ${libro.descripcion}</p>
                    </div>
                    <div class="cont-result"> 
                        <h4 class="subTitulo">Porcentaje de Participacion: </h4>
                        <p>${libro.porcentajeParticipacion}%</p>
                    </div>`
            });
        })
        .catch(err => {
            console.error('Error al buscar:', err);
        });
}

