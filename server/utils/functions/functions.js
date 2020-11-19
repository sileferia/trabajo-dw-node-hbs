const functions = {};

functions.crearHtml = (productos = []) => {

    let html = '';

    productos.forEach((producto) => {

        if (producto.stock == 0) {
            return;
        }

        const precioFormateado = functions.formatearPrecio(producto.precio);


        const productoJson = {
            "_id": producto._id,
            "nombre": producto.nombre,
            "nameImage": producto.nameImage,
            "precio": precioFormateado
        }

        let urlImagen = "";
        if (producto.nameImage === "") {
            urlImagen = `app/no-image-webp`;
        } else {
            urlImagen = `productos/${producto.nameImage}`;
        }

        const productoString = JSON.stringify(productoJson);
        html += `
        <div class="box-card">
            <div class="box-img-producto">
                <img src="/images/" alt="">
            </div>
            <div class="box-info-producto">
                <div class="box-datos-producto">
                    <h3 class="nombre-producto">${producto.nombre}</h3>
                    <span class="precio">${precioFormateado}</span>
                    <p class="descripcion-producto">${producto.descripcion}</p>
                </div>
                <div class="box-options-productos">
                    <button class="button btn-agg-carro">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <input type="text" class="json-productos" hidden value='${productoString}' />
                </div>
            </div>
        </div>
        `
    })

    return html;

}

functions.formatearPrecio = (precio = 0) => {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return formatterPeso.format(precio);
}

functions.formatearPass = (passEncrypt = '') => {

    const tam = passEncrypt.length;

    let pass = '';
    for (let i = 0; i < tam; i++) {
        pass += '*';
    }

    return pass;
}


module.exports = functions;