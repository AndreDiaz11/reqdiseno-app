import type { GrupoMes, Pedido } from './tipos';
import { claveMes, etiquetaMes } from './formato';

export function agruparPorMes(pedidos: Pedido[]): GrupoMes[] {
  const mapa = new Map<string, Pedido[]>();
  for (const p of pedidos) {
    // el mes de un requerimiento es el de su entrega, no el de su registro
    const clave = claveMes(p.fechaEntrega);
    const lista = mapa.get(clave);
    if (lista) lista.push(p);
    else mapa.set(clave, [p]);
  }

  return [...mapa.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([clave, lista]) => ({
      clave,
      etiqueta: etiquetaMes(clave),
      pedidos: lista.sort(
        (a, b) =>
          b.fechaEntrega.localeCompare(a.fechaEntrega) ||
          b.creadoEn.localeCompare(a.creadoEn),
      ),
    }));
}
