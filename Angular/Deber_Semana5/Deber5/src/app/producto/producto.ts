import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
})
export class Producto implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];

  
  filtro = '';


  seleccion: Record<number, number> = {};

 
  clienteNombre: string = localStorage.getItem('clienteNombre') || 'Consumidor Final';
  clienteCedula: string = localStorage.getItem('clienteCedula') || '';
  clienteDireccion: string = localStorage.getItem('clienteDireccion') || '';
  clienteTelefono: string = localStorage.getItem('clienteTelefono') || '';

  constructor(
    private _productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this._productoService.todos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error API:', err)
    });
  }

  
  guardarClienteEnStorage(): void {
    localStorage.setItem('clienteNombre', (this.clienteNombre || '').trim() || 'Consumidor Final');
    localStorage.setItem('clienteCedula', (this.clienteCedula || '').trim());
    localStorage.setItem('clienteDireccion', (this.clienteDireccion || '').trim());
    localStorage.setItem('clienteTelefono', (this.clienteTelefono || '').trim());
  }

 
  aplicarFiltro(): void {
    const t = this.filtro.trim().toLowerCase();

    if (!t) {
      this.productosFiltrados = this.productos;
      return;
    }

    this.productosFiltrados = this.productos.filter(p =>
      (p.nombre ?? '').toString().toLowerCase().includes(t) ||
      (p.categoria ?? '').toString().toLowerCase().includes(t) ||
      (p.precio ?? '').toString().toLowerCase().includes(t) ||
      (p.stock ?? '').toString().toLowerCase().includes(t)
    );
  }

  limpiarFiltro(): void {
    this.filtro = '';
    this.productosFiltrados = this.productos;
  }

  irNuevo(): void {
    this.router.navigate(['/nuevoProducto']);
  }

  irEditar(id: number): void {
    this.router.navigate(['/nuevoProducto', id]);
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    this._productoService.eliminar(id).subscribe({
      next: () => {
        delete this.seleccion[id];
        alert('Producto eliminado');
        this.cargarLista();
      },
      error: (err) => {
        console.log('Error eliminar:', err);
        alert('No se pudo eliminar');
      }
    });
  }

  toggleSeleccion(id: number, checked: boolean): void {
    if (checked) {
      if (!this.seleccion[id]) this.seleccion[id] = 1;
    } else {
      delete this.seleccion[id];
    }
  }


  setCantidad(id: number, value: any): void {
    if (this.seleccion[id] == null) return;
    const n = Number(value);
    this.seleccion[id] = isNaN(n) || n < 1 ? 1 : Math.floor(n);
  }

  seleccionarTodos(checked: boolean): void {
    if (checked) {
      for (const p of this.productosFiltrados) {
        if (!this.seleccion[p.id]) this.seleccion[p.id] = 1;
      }
    } else {
      for (const p of this.productosFiltrados) {
        delete this.seleccion[p.id];
      }
    }
  }

  getItemsSeleccionados(): any[] {
    const ids = Object.keys(this.seleccion).map(x => Number(x));
    return this.productos.filter(p => ids.includes(p.id));
  }


  generarFactura(): void {
    this.guardarClienteEnStorage();

    const items = this.getItemsSeleccionados();
    if (!items || items.length === 0) {
      alert('Selecciona al menos un producto para generar la factura.');
      return;
    }

    const hoy = new Date();
    const fecha = hoy.toLocaleDateString();
    const hora = hoy.toLocaleTimeString();
    const numeroFactura = `F-${Math.floor(Math.random() * 90000) + 10000}`;

    const ivaPorcentaje = 0.15;

    const cliente = (this.clienteNombre || '').trim() || 'Consumidor Final';
    const cedula = (this.clienteCedula || '').trim() || '---';
    const direccion = (this.clienteDireccion || '').trim() || '---';
    const telefono = (this.clienteTelefono || '').trim() || '---';

    const filas = items.map((p: any, i: number) => {
      const cantidad = this.seleccion[p.id] ?? 1;
      const precio = Number(p.precio || 0);
      const totalLinea = precio * cantidad;

      return `
        <tr>
          <td>${i + 1}</td>
          <td>${(p.nombre ?? '').toString()}</td>
          <td>${(p.categoria ?? '').toString()}</td>
          <td style="text-align:center;">${cantidad}</td>
          <td style="text-align:right;">$ ${precio.toFixed(2)}</td>
          <td style="text-align:right;">$ ${totalLinea.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const subtotal = items.reduce((acc: number, p: any) => {
      const cantidad = this.seleccion[p.id] ?? 1;
      return acc + (Number(p.precio || 0) * cantidad);
    }, 0);

    const iva = +(subtotal * ivaPorcentaje).toFixed(2);
    const total = +(subtotal + iva).toFixed(2);

    const html = `
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Factura ${numeroFactura}</title>
      <style>
        body{ font-family: Arial, sans-serif; padding: 24px; color:#111; }
        .row{ display:flex; justify-content:space-between; gap: 16px; }
        .box{ border:1px solid #e5e7eb; border-radius:10px; padding:14px; }
        h1{ margin:0; font-size: 28px; }
        .muted{ color:#6b7280; font-size: 13px; margin:4px 0; }
        table{ width:100%; border-collapse: collapse; margin-top: 16px; }
        th, td{ padding:10px; border-bottom:1px solid #e5e7eb; }
        thead th{ background:#111827; color:#fff; text-align:left; }
        .totales{ width: 320px; margin-left:auto; margin-top: 14px; }
        .totales div{ display:flex; justify-content:space-between; padding:6px 0; }
        .total{ font-weight:800; font-size: 18px; border-top: 2px solid #111827; padding-top: 10px; }
        @media print{ .no-print{ display:none; } }
      </style>
    </head>
    <body>
      <div class="row">
        <div>
          <h1>FACTURA</h1>
          <p class="muted"><b>N°:</b> ${numeroFactura}</p>
          <p class="muted"><b>Fecha:</b> ${fecha} ${hora}</p>
        </div>

        <div class="box">
          <p style="margin:0"><b>Empresa:</b> Productos CRUD</p>
          <p class="muted" style="margin:6px 0 0"><b>RUC:</b> 9999999999</p>
          <p class="muted" style="margin:6px 0 0"><b>Dirección:</b> San Lorenzo - Ecuador</p>
        </div>
      </div>

      <div class="box" style="margin-top:12px;">
        <p style="margin:0"><b>Cliente:</b> ${cliente}</p>
        <p class="muted" style="margin:6px 0 0"><b>Cédula/RUC:</b> ${cedula}</p>
        <p class="muted" style="margin:6px 0 0"><b>Dirección:</b> ${direccion}</p>
        <p class="muted" style="margin:6px 0 0"><b>Teléfono:</b> ${telefono}</p>
        <p class="muted" style="margin:6px 0 0"><b>Detalle:</b> Reporte generado con JavaScript (window.print)</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th style="text-align:center;">Cant.</th>
            <th style="text-align:right;">Precio</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>

      <div class="totales">
        <div><span>Subtotal</span><span>$ ${subtotal.toFixed(2)}</span></div>
        <div><span>IVA (${(ivaPorcentaje*100).toFixed(0)}%)</span><span>$ ${iva.toFixed(2)}</span></div>
        <div class="total"><span>Total</span><span>$ ${total.toFixed(2)}</span></div>
      </div>

      <div class="no-print" style="margin-top:18px;">
        <button onclick="window.print()" style="padding:10px 14px; border-radius:8px; border:none; background:#2563eb; color:white; cursor:pointer; font-weight:700;">
          Imprimir / Guardar como PDF
        </button>
      </div>

      <script>window.print();</script>
    </body>
    </html>
    `;

    const w = window.open('', '_blank', 'width=1000,height=700');
    if (!w) {
      alert('Permite ventanas emergentes (popups) para generar la factura.');
      return;
    }

    w.document.open();
    w.document.write(html);
    w.document.close();
  }
}