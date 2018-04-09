import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  HttpClient
} from '@angular/common/http';
import {
  SimpleTimer
} from 'ng2-simple-timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bodyData: any = {
    pir: "Not In Motion",
    temp: 0,
    heart: 0
  };
  timerId: string;
  public tempStatus = false;
  public hrtStatus = false;

  constructor(public navCtrl: NavController, private http: HttpClient, private st: SimpleTimer) {
    this.st.newTimer('1sec', 1);
  }

  ngOnInit() {
    // lazy mode
    this.timerId = this.st.subscribe('1sec', () => this.callback());
  }

  callback() {
    this.http.get('http://192.168.1.101/rpc/read', {
      responseType: 'text'
    }).subscribe(data => {
      var str = data.toString();
      var slashRmv = str.replace(/\\/g, "");
      var tempJson = JSON.parse(slashRmv);

      var resp = {
        pir: (tempJson.pir) ? "In Motion" : "Not In Motion",
        temp: tempJson.temperature,
        heart: tempJson.heart
      };
      this.bodyData = resp;
      if(resp.temp < 34 || resp.temp > 38){
        this.tempStatus= true;
      } else {
        this.tempStatus= false;
      }
      if(resp.heart < 80 || resp.heart > 135){
        this.hrtStatus = true;
      } else {
        this.hrtStatus = false;
      }
    });
  }

}

