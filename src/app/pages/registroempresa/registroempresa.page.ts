import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-registroempresa',
  templateUrl: './registroempresa.page.html',
  styleUrls: ['./registroempresa.page.scss'],
})
export class RegistroempresaPage implements OnInit {

  empresaForm!: FormGroup;
  submitted = false;
  empresas: any;
  provincias: any;

  constructor(
    public formBuilder: FormBuilder,
    public empresaRegis: EmpresaService,
    public provinciasService: ProvinciasService,
    public authService: AuthService,
    public alertController: AlertController
  ) { 
    this.empresaForm = this.formBuilder.group({
      cif:        new FormControl("", Validators.compose([ Validators.required, Validators.pattern("[A-Za-z]{1}[0-9]{8}") ])),
      empresa:    new FormControl("", Validators.compose([ Validators.required ])),
      direccion:  new FormControl("", Validators.compose([ Validators.required ])),
      provincia:  new FormControl("", Validators.compose([ Validators.required ])),
      ciudad:     new FormControl("", Validators.compose([ Validators.required ])),
      cPostal:    new FormControl("", Validators.compose([ Validators.required ])),
    });
   }

  ngOnInit() {
   this.getProvincias();
  }

  get f() { 
    return this.empresaForm.controls; 
  }

  get errorControl() {
    return this.empresaForm.controls;
  }

  alert(event: any) {
    console.log(event.target);

    const datos = {
      cif:        event.target.cif,
      empresa:    event.target.nomEmpresa,
      direccion:  event.target.direccion,
      provincia:  event.target.provincia,
      ciudad:     event.target.ciudad,
      cPostal:    event.target.cPostal
    }

    console.log(datos);

    this.submitted = true;

    if (this.empresaForm.invalid) {
      return;
    }

    // Mostrar los valores del formulario en caso de éxito
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.empresaForm.value, null, 4));
  }

  // Método para obtener la lista de provincias
  getProvincias() {
    this.provinciasService.getProvincias().subscribe(async (ans) => {

      console.log(ans);

      this.provincias = ans;

      console.log(this.provincias);

    });
  }

  enviarDatos() {
    console.log('Enviando datos:', this.empresaForm.value);

    this.submitted = true;
  
    if (this.empresaForm.invalid) {
      console.log('Formulario no válido. Deteniendo envío de datos.');
      return;
    }

    this.empresaRegis.registroEmpresa(this.empresaForm.value).subscribe(
      (ans) => {
        console.log('Respuesta del servidor:', ans);
  
        this.empresas = ans;
  
        console.log('Datos de registros:', this.empresas['data']);
        console.log('Texto de registros:', this.empresas['texto']);
        console.log('Authorized de registros:', this.empresas['authorized']);
  
        if (this.empresas['authorized'] === 'NO') {
          console.log('Mostrando alerta de error...');
          // Llama al método mostrarAlertaNO con el mensaje específico
          this.mostrarAlertaNO('Error', 'CIF ya registrado');
        } else {
          console.log('Mostrando alerta de éxito...');
          // Llama al método mostrarAlertaOK con el mensaje específico
          this.mostrarAlertaOK('Enhorabuena', 'Empresa creada correctamente');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        console.log('Mostrando alerta de error en la solicitud...');
        // En caso de un error en la solicitud, muestra una alerta de error genérica
        this.mostrarAlertaNO('Error', 'Email ya registrado');
      }
    );
  }

  async mostrarAlertaOK(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.href = '/login';
        }
      }],
      cssClass: 'custom-alert-header'
    });
  
    await alert.present();
  }
  
  async mostrarAlertaNO(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert-header'
    });
  
    await alert.present();
  }
}