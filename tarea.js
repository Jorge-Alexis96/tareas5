let factura = {
	nombre: '',
	ruc: '',
	fecha: '',
	nro: 0,
	detalle: []
};

// Eventos

// click Agregar Producto
document.getElementById('agregarProducto').addEventListener('click', () => {
	accionAgregarProducto()
})

// autocalculo 
document.getElementById('facturaProducto').addEventListener('input', (e) => {
	let cantidad = document.getElementById('cantidad')
	let pUnit = document.getElementById('pUnit')
	let pTotal = document.getElementById('pTotal')

	switch (e.target.id) {
		case 'pUnit': {
			if (cantidad.value != "") {
				pTotal.value = parseInt(cantidad.value) * parseInt(pUnit.value)
			}
			break;
		}
		case 'cantidad': {
			if (pUnit.value != "") {
				pTotal.value = parseInt(cantidad.value) * parseInt(pUnit.value)
			}
			break;
		}
	}
})

// guardarFactura
document.getElementById('guardarFactura').addEventListener('click', () => {
	factura.nombre = document.getElementById('nombre').value
	factura.ruc = document.getElementById('ruc').value
	factura.fecha = document.getElementById('fecha').value
	factura.nro = document.getElementById('nro').value

	// document.getElementById('facturaHelper').innerHTML = JSON.stringify(factura, null, ' ') (resultados)
	console.log(factura)
})

// Funciones
const accionAgregarProducto = () => {
	let producto = {
		cantidad: parseInt(document.getElementById('cantidad').value),
		descripcion: document.getElementById('descripcion').value,
		pUnit: parseInt(document.getElementById('pUnit').value),
		pTotal: parseInt(document.getElementById('pTotal').value),
	}
	console.log(producto)
	agregarProducto(producto)
	obtenerSumaTotal(factura.detalle)
	limpiarFormularioAgregarProducto()
}

const agregarProducto = (producto) => {
	const detalleRef = document.querySelector('#invoice-detail tbody')
	factura.detalle.push(producto);
	let detalle = '';
	factura.detalle.forEach((p) => {
		detalle += `
      <tr>
        <td class="text-left">${p.cantidad}</td>
        <td class="text-left">${p.descripcion}</td>
        <td class="text-right">${p.pUnit}</td>
        <td class="text-right">${p.pTotal}</td>
      </tr>
    `
	})
	detalleRef.innerHTML = detalle;
}

const obtenerSumaTotal = (productos) => {
	let sumaTotal = productos.reduce((acum, p) => {
		return acum + p.pTotal
	}, 0)
	document.getElementById('facturaPrecioTotal').innerHTML = sumaTotal;
}

const limpiarFormularioAgregarProducto = () => {
	document.getElementById('cantidad').value = ""
	document.getElementById('descripcion').value = ""
	document.getElementById('pUnit').value = ""
	document.getElementById('pTotal').value = "0"
	document.getElementById('cantidad').focus()
}