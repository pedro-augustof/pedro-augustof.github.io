import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  closed = "aberto";

  cli: String = '';
  tec: String = '';

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    prioridade: '',
    status: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: OsService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta
      this.findNames();
      this.isClosed();
    })
  }

  return(): void {
    this.router.navigate(['os'])
  }

  findNames(): void {
    this.tecnicoService.findById(this.os.tecnico).subscribe(resposta => {
      this.tec = resposta.nome
    })

    this.clienteService.findById(this.os.cliente).subscribe(resposta => {
      this.cli = resposta.nome
    })
  }

  isClosed(): void {
    if (this.os.status == "ENCERRADO") {
      this.closed = "fechado"
    }
  }

  prioridade(x: any) {
    if (x == 'BAIXA') {
      return 'baixa'
    } else if (x == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }
}
