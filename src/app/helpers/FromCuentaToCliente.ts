import { Cliente } from "../models/cliente";

export class FromCuentaToCliente {
  constructor() {

  }
}

export function fromCuentaToCliente(cuenta: any){
  const cliente = new Cliente();
  cliente.id = cuenta.cliente.id;
  cliente.nombre = cuenta.cliente.nombre;
  cliente.apellido = cuenta.cliente.apellido;
  cliente.email = cuenta.email; // excepción, el email está directamente en cuenta
  cliente.dni = cuenta.cliente.dni;
  return cliente;
}
