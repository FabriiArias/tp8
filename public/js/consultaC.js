function buscar() {
    let paginas = document.getElementById('input-paginas').value;
    console.log(paginas);
    if (!paginas) {
        console.error('libro sin paginas xd');
        return; // Evitar hacer la búsqueda si no hay autor seleccionado
    }

    fetch(`/cc?paginas=${paginas}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // console.log('Resultados:', data);
            const listadoSegunPaginas = document.getElementById('listas');
            listadoSegunPaginas.innerHTML = ''; 

            if (data.length === 0) {
                listadoSegunPaginas.innerHTML = `<li>No se encontraron libros con ${paginas} paginas.</li>`;
                return;
            }

            data.forEach(libro => {
                listadoSegunPaginas.innerHTML += `
                <div class="cont-cc">
                    <h4> Titulo: </h4> <p>${libro.titulo}</p> 
                    <h4> Descripcion: </h4> <p>${libro.descripcion}</p>
                    <h4> Anio: </h4><p>${libro.anio}</p>
                </div>    
                `
            });
        })
        .catch(err => {
            console.error('Error al buscar:', err);
        });
}

