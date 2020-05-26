import React from 'react';
import {Redirect} from "react-router-dom";


import axios from "axios";
import { async } from "q";

import Header from '../Header.js';
import NewOrg from './NewOrg.js';
import Footer from '../Footer.js';
import AddPrizes from './AddPrizes.js';

import {Button, Grid,Icon, Image, Label, Segment} from 'semantic-ui-react'
class NewOrgPage extends React.Component{
	constructor(props) {
		super(props)	
		this.state = {
            loggedIn: this.props.data.loggedIn,
            userName: this.props.data.userName,
			routeMain: false,
			allowAddPrize: false,
			showAddPrize: false,
			orgAproved: false
		}
		this.handlerClick = this.handlerClick.bind(this);

	}
	
	//TODO:deal with only Admin being able to add organization and prizes
	// componentWillReceiveProps(nextProps){
	// 	nextProps= this.props
	// }

	handlerClick(allowAddPrize) {
        this.setState({
			allowAddPrize: true
		});
		this.props.record(allowAddPrize)
	}

	// function 

	render() {
		return(
			<div>
                <Header data={{loggedIn: this.state.loggedIn, userName: this.state.userName}}/>
				<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column width={8}>
						{/* Form to add organization: */}
						{/* sending record to know when to enable showing adding prize*/}
					{!this.state.allowAddPrize && <NewOrg record={this.handlerClick} data = {this.state}/>}
					</Grid.Column>

					<Grid.Column floated='right' width={6}>
					</Grid.Column>
				</Grid.Row>
				</Grid>
				{this.state.orgAproved && 
					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={8}>
							<div as='h3' style={{ fontSize: '2em' }}>
								Add Prizes for Your Organaztion!
								</div>
								<br></br>
							<Label as='a' color='red' ribbon>
							Something Special!
							</Label>
							<br></br>
								<Image bordered rounded size='large' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASDxIQEBIQDxAQEBAPEBAQEBAQEA8PFRUWFhUSFRUYHSggGBolGxUWITEhJSkrLi4uFx8zODUtNygtLisBCgoKDg0OGxAQGi8fHyUrLy0vLS4tLS0tLS0rKysvLSsvLS8tLS4rLS0rLS0tLS0tLS0tLS0uLS0tLS0tKy0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABFEAACAQIDBAYGCAMHAwUAAAABAgADEQQSIQUGMVETQWFxkcEHIjJSgaEUI0JikrHC0VNyghVDY3Oi8PGy0uEkMzRko//EABsBAQACAwEBAAAAAAAAAAAAAAABBAIDBQYH/8QANBEBAAIBAgMECQMFAQEBAAAAAAECAwQREiExBUFRcRMiMmGBscHR8BSRoSNCYuHxM0MG/9oADAMBAAIRAxEAPwDuMAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgECu23tvDYSn0mJqrSX7IJuznkqjVj3TG14rG8t2DT5M1uHHG7A4j0urn+pwhen1NUrhHP8ASqsB4mVZ1cd0O7j/APz1pr6+TafdG/1hrN1t8sNjvVTNSrAXNGpbMR1lCNGHz5gTdiz1ydOrm67szNpOdudfGPr4NHNznCBitv8ApLwOGqGkmfFVFJDdFlFNWH2S7GxP8t+vrmi+orXl1dXS9kZ88cXsx7/t9xsX0lYOuwSqHwrNoGq5TSvyLg+r3kAdsxpqqTO08m3UdhajHXiptfy6/t3/AAbWWXFEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgZX0h71/2fhM9PK+Iqt0VFTYhWsSajDkAPEia8mThhd0Wl9Pfn0jnP2Yb0WbZw4qYrHbRxSHFOy0kau4zrTtmbIOpSSBYCwy2E04r1jebTzdHW6fLeK48FJ4Y8I5btdjaextqk00qUTibHJUpjosQLXOlwOkUa6G4/OZT6LLy72jHOu0Hr7TFffzj/Xzcs2vgMRs/F5GYpWpFalKqmgZbnLUW/UbEW7CNZRvS2O2z1Wn1OLWYOLblPKY+jt25+3lxuDSuLB9adZRwSsvtDuNww7GE6WK/HXd4nXaX9Nmmnd1jy/OXmZ2lWOLq1MDSdqdOmq/Ta1PRxn1XDU26mIuWb7K2HFrrM+tyhjjiMURktG890fWfp4/Dm/gt1Nn0kyJhMNltlOaklRmH3mYEt8TEY6x3F9XnvO83n92b3r9HNCqjVMEow9cAkUlstCt93LwQ8iLDmOsacumraN68pdPQdtZcNorlnir/MfEei/b6thTh8RURKlCoadJKrBKnRWBC5WNzlOZewADqmOlyerw27mzt3SbZozYo3i0bzMdN/8AfKW8Blt58sAgEAgEAgEAgEAgEAgEAgEAgEAgfMO9G8+KxOMrO1aqKZquEp52FNKYJCqE4cLd5uZRtabTzer0+KuKscMc1dfOOq4GtpqrXaVzLlnJj98HKOmkZI7zSZNpmsn6bkEMpKspDKykhlYaggjge2al+dpjaXQMbjv7V2S7PY4/Zo6UsNDXw322t3C5A+0g4BrS1xelpz6w4Pov0Oqjh/8AO/Lyn86e6fcofR3vmMCMaGIIfD9LRUk2bFIQqKB2h7k8qfZM8VuCJaddi/UXrHhPPy7/AM97rno42e1LZtFqhLVsVmxtdyLM9Wv6927QpUf0yxjjarjau/FlnbpHKPg0juACSbAC5PITNXiJmdoZDeWo2KU0g706J0KozIz/AMxBvbs4c7yrktNuUdHc0WKmD1rRvb5eX3c4p7oLUV2pv6gq1Ep6ZgVQ5T3+sGF+yVfRu7+tjaIn835q7G4PFYEZlxDUgToKVWpSZjzCqde+Ii0dGVr4skb3iJ84iXjD+kratIgLXLqOqstOpmHaSM3zm2L5I73PyaXSZOmOI+Mx/ETs6l6NN/DtEPRrolPE0lFT6u4SpTvYsAb2IJF9esSziyzblPVxtfoa4Ii9PZnlz7pbqbnMEAgEAgEAgEAgEAgEAgRsXjAmnFjwHmZja2zdiwzfyZ7aGNxh1SoEHJUX9QJmi1r90upgw6WParv5zP02UVXbO1KTXWqlUfw69FMvwamFbxvNXpclfev/AKHRZY5Rw+Uz9d3Hts7Mda1RiEUs7vkDD1cxJyg9k1cfNf8A021Y2nfzQ6TumhBtfXQEH4xvv0IpMe1Baja3mcc4VbRNLHaVW81zXZdx5uKF3u3tlsJiUrqMwF1qp1VaLaOh7xw7QDFLTS25qcNdRinHPwnwnun87mdXCr9Kr06ZunSdFSY9au3qnwt4zfPSNnKpxRktN45xt/POX0uu0SAFUhQoCgADgNBxlx5vaZM43Hs65b6cTb7R7ZpvfflDpabBwetbqwW8+8l2+h4Rg1eoejaqGslHn63vAXufs2PXNFreDq4sX91uiSm1sHhcOtJKtOp0NMKqU3VncgchwJP5zHirEdW2NPlyW34Zjdit5DhsS/TdLielKgZTTQ00sOCgsCovc8Tx65hN6rNdLlmNuUM9/Z7dTX7CP+ZHpIbP0V/GHQvQlsyqMfWqspVKeGKk9RZ3XKB8EbwljT87bw5HbETjwxW3WZ+X5DtkuPNiAQCAQCAQCAQCAQPJcDiR4wG2xKDr+Rg2czxm8jfSKpJNulcDsUMQB4AShbJPFL1uHS4/Q1j3QscFvEjcSJlGXxacmhn+03iK7V/X9mj/AHaafWj+I/3T1Lwtqb3su2K8XOVDLm9FPBTr3z4e6PrPj06bzhN4d2yxAWtVsoORKjNVVL8QtzccB19QiaQimpvE77sritl4inxXMPepm/y4zXONcx6vnv0QumHBtD18/iJqmswvUzUyRtb9xblJid2NqTWXrpiImsMq57Q8/ScjpUA/vFa3PKVsPlJiO5qyWiYm3j9tmmxG/OKdrgqi+4BcfEnU/KZXvaerVp9Phx86xvPjP5yQNpb34yqpTpDTQ6EU7rmHaePwmvmt7V332U9Gq17XNuUjaG2Mlo5xK72WFqOEckE+zYDU8u+arV26LuHNxe00mH2BfhTdu1rgfORFZllbPSvfCzobDYcFRPDymUY5abaynctNmUmw1Va/SKmU+sOCsn2lJJ4H9j1TZSJpO+6nqb11OOcc133/AInul0nD46m4DKwIYBgeAIOoIM6MTEvHWpaszEx0SQZLAQCAQCAQCAQCBUbWrslQWOhUadV7m/lAZTGg8dD8oSbrYgCQyiHON6dg1RWevhrOlRi70gQrq51YqDowJueevXKuTDO+8O9ou0KxSKZOW3LdlenObK11N7MNUcDruplaYdmlonaa82qxG+uFA9XpG5AJbT4kS76WHmo0OTv2ZzaO+qFjkpOf5mVfyvMJy+5ZroJ77KXFb01W9lEXvux8pj6SW2NJWO9RbRxtWr7RHwRRb42vMot4tV8Ux7KEtdxa4zAcNSrDuIk8NZ6cmMZ81eVo4o/af3+8SmU8UCP7z+qnm+azXNZjw/dbpnx2jnxR513/AJh4euvWxIF7fVtYXk8Np/6xnLir1meX+Mm3x5IsqnvOl/zk+i8Zap1s/wBlfp93gVKh5CTw0hjGXUX6clpspwD9YmcdjZCfjYzVaYX8NMkxtM8/FtdlYzZttUahUHsvUDVMr9TBhe1jrfSItQyYdTE7xO/x+nJMr76VCPUpoh5sxf5C00zkl0K6OnWZmf4VmI3hxT/3jKOSAJ8xr85jNrS31w4q/wBqtqM7m5zO3Vcl2J5C8x2beOI9zu+xsMaeHoUm9qnRpU2/mVAp/KdWkbViHgtTeMmW9475mf3lZUzbgbTJXlISs3O/fJY7HlrdnhJRsdBhBYBAIBAIFTt9NEPaw/L9jApTAj4/FCnSZ21CKTaY3nasy3afH6TLWm+28qXF10xFJjhW+vC3WjUfIHPLN1f74cZV9JxdJd39JGLlavLx6uQbxVsd0xGID0qicEKZco7L6kdtzHFE8rJ9FenrYp/ZEp7SJFnptm96mAb9uU2t4zGaeEt1NTP/ANMczP8Aj9p+5yipf2KVdz2U1J8M0x4LePz+zdOrxR1pMefDHzstcNu5in4UGA5uVT5amTGKzXbXYY6R+ft9Vrhtxa7e21NO4M58pnGH3q9u0Y7qrfDbiUhq7O3YAqj8r/OZxihWv2hknptHwWVPdfCoP/ZVrdb3c/6rzOKRCtfU3t1lU7e3WpVEPRoqVF1Qj1QSPskjqPCTMMKZJhlqe7YqoXotZlJWpSqj16dQcVJH521muaLlNTNesbq3FbNq0vbpsB7wGdfEftNc0lcpqsc9eSPTcX0IJ5XF/DjNc1lapmpPKLQktXAAzEKOskgf8yIru2WzxXrMQWrtxB7Clu4RGG3fyRftPDHKu9vg8YfarM4zI2TrCMFYjsYqQPAzKcdY6ywjW5bz6tNv5dE3U2rspHVuiqU6wIyvXzVbNzUi4U9thM6Wx1VdRh1uSOu8eEcvz+XU8DmqKGQZlYXDD2SOYMtRO/RwcleCZrblKyp4Q/aIHzmWzTNjoRBzMlju99JyFoQVGJMB2AQCAQCBXbeW9G/usp8vOBmyTAgbZpF8NWTrajUA78pt85jeN6zDfpr8GalvCY+blNPEutipI5a8O6c17RdYTar4tqOCxGV0qVPbZVNVVVWcqjH2SctrjqvN2KOOdpc7W5P09PSY+U9PyO9s8HurgVtlo0783Bdh8WvLUY6x0hwbazLf2rStl2VSUWVR4WA+EnZh6SXtcCOUbI45exhByk7I4nsYQRsjieWwQhG6PU2YD1QmLMtvFu9UpP8ATMOPWAAxCa2qUx9ogam3Magai9srYzDdS8Tyk/gNnpiUzU+IsHRrZqbEXs1tNQQQRcEEEEggyNt0zaa9UTHej2lV9pVBPWBYxwsozdyjxfofrccOyv8AcqAofg3A+AmNq27pb8WowRPr1/ZT4Pc5rMajUsOEdqb9KwBV1NmUj/fESnfjidpehwRpbVi1Imd+6ITF2ds6l7dWpiGH2aS5V/EbCa5275XK8X9tIjz+0HRtunTFsPhqafeqE1Ce8Cw/ON47oZejtPtWn4cnT/Rpjq1TA56jXvXqhAAqhUFtAAOebxl/TTM05vI9t1rXU7V8I38/+NXeWHIKIHq8B2hxgPQCAQCAQIu00vRqD7pPhr5QMmYHlhfQ8DoYInZx+pRykqeKkqe8aTl7bPdRbijeO85sk5cZhW5V1H4gyfqm7B7bn9pxvp584dZEvPKnqWIYdo7YN02jiFbrseR/eRsy3SckG4ywblCQbva0SeAg3exhD12EbHExu8WzUwlSnVwpINRjTCrdjRqMbqUQe3SJuGpHT1sy5WGuMx4N+PJvG1vz87p+HRq9j48VaK1OjCNd6brxC1abtTqKCeIDqwmUc2rJHDO35zTHrHuksHAN5qmbH4tuddte5VHlObqPbez7G3jSx5yrrTQ6pbQO1ejell2ZQ5sar+NR7fK06Wnj+nDxXbFt9Xf4R/ENQJvct6EBbwH8P1wHoBAIBAICMoIIPAix7oGT2ng+icLe4YXU9fce2BEgcu2zSy4msv8Ai1CO4sSPkZzskbWl7PS24sFJ90fJXM2Vqbe5WoN8BUUn5ScU+vDDXV3wWdfWdB48sAgPUcUy8DccjwgXOEqKy5joeUB/pFHAQPL4k90CufE1KjFKQuetjoq958uMCbgdmrTOc/WVf4jDh2KPsj5wPWG2etNWCaBnapYAAAkknh1kkknrhMzv1I50PdA4DtQ5sTiG54ir8mI8pzc/ty9t2VG2lr8fmjWml0RaQl3bdCnl2fhR/wDXpH8ShvOdXFG1I8ngu0LcWqyT/lPzXIM2KZbwFvAl4cerAcgEAgEAgECk3mp6U25Fl8bHygUF7d0Dne9lO2MqcmyOPigH5gyhmja8vWdmW4tNX3bx/LP48/VORxCMR3gXmFJ2tCzqK8WK0e6XX8K+amrc1U+InSeLnqdhAgECy2YfVPfAm3gVm1MUQCq8YFjsJwcOluIuG/nvqT38fjAsICwIWLFge4mQmHz7VN3qHnWrH/8ARpzM3ty912dG2mp5fV5tNa68vwPcYlMdX0Hs+nkpU04ZaaL4ACdesbRs+dZbcV5t4zKUDJa3l6oUXYgDtNoBh6hdrKDa18zCw+A4mBZItgBygeoBAIBAIBArd4EvQv7rKfLzgZiBj9+cBqlcf5T9nEqfzHhKuor0s73Y+flbFPnH1+n8sdWW6kcwR8pWh27RvEw6buzWz4LDP71CkfjlE6UPEXjadlnJYiAQLHZp0MCVUbSBSYrVjAk7DxOSpkPs1NO5ur9vCQlo5KCwI+0V+qc9aqx+FtYlNer52pm4vzJbxJM5WT25e90cbaenlD1MFk7hKQepTQ8HqU0PczAecmI3nZjktw0tbwiZ/aHevpa8Fu5+7w8eE67529BajcSEHJdW8TCDlLCqNbXPNtT4mBPwg4/CBIgEAgEAgEAgRdqJehUH3CfDXygY+BXbwUg2ErC17U2Yd6jMPmJhkjekrWivw6ik++I/fk5pe85717Vbg7cRkOBcFKuGFlPFKtIk5SD1EDQg/DkL+O29YeR1mGcea0e9spsVBAIE/Zp4wH6xgVVfiYSZtrIS1OBxGemG6+DfzDj+/wAZLFIgLA4RvZsX6HjKlBRanpUo/wCS98o+BDL/AEzmZq8N5e47Ozxl01Zju5T5x+RPxVE17LvE0W4WzOnxyXF0og1nuNCRog/EQf6TN2Cm9/JzO1dR6LTTHfbl9/45fF2OmgHCdF444IQW8CXhRp8YD0AgEAgEAgEDzUW4I5gjxgYYwG6yZlZfeUr4i0iY3hlWeG0T4OSCc17iVpugB/aCn36FVT2lSpX82lnTz1hxO2McbVv8HSRp2iWnAewYBAmbPPGA/WMCtrcYS8ASErPZVbK1ibB7D+rq/aESu5KCwMR6V8HTOFp1zYVKdUU15utQG6/DKG7gecraqI4Yl3Ow8tozWxx0mN/Lbv8A52/ZygmUd3qYh0L0TUv/AJL8zRTwDk/9QlvSx1l53t+3/nXzn5fZ0US484W8AgT8OPVEByAQCAQCAQCAQMTtBctaoOTtbuvcQI94HK8emWtVX3atRfBiJzbRtMva4bcWOs+MR8j+7lTLjsN953TxpufITbgn1lDtWu+Dfwl08S68yS3KB6DQJeAOp7oD9YwK2pUF9Ne7X5wktOmx+6PEyBY4TDKNbXPM6mBb0XuO0aHvkoQN4NvUMHS6WseJK06a6vVe18qj8ydBML3ikbysabTX1GSMdP8AjjW8W8FfGVekqmyi/R0lPqUl7OZ5sePYLAc7Jkm87y9ppNHj01OGnXvnvn88FTNa06f6KadsLWb3sQQO4U6fmTL2lj1Z83lu3rb5qx/j9ZbeWnCLeAt4FkgsAOwQPUAgEAgEAgEAgZDeFLYhvvBW+VvKBXXhLm+8iZcZWH3w34lDec5+X25et0Ft9NSfd8p2RNnVMuJw7csRSH4jk/VJw+3DDtGN9Pb4fN1YGX3lCwAiA5h2a9hbXrMD1Vp39olu/h4QPKLCUqikCdTEB6m9oHOPSvULVMKP81vkB5ytqfZdrsSP68+U/RiBTMoPVvJW0DrPo1S2z0PvVKzeDlf0zoab2Hj+2p31cx4RHyaq8sOULwh6TUgcyBAtYBAIBAIBAIBAIGX3tS1Sm3vIV/Cb/qgUWaEsFvnpizb7VNG/Nf0ylnj13peyrb6fymfv9VCHsyt7tSm/4XVvKa8ftQt6uN8F/J2BTOi8e9iEFEB7D+1AdqCAUqcCXTWEn1gLA5x6STfF4deVGq3+pBKup9mHe7Cj+rafd9YZkLKT05GpgwOsbm0cmAoKPcLfiYt5zpYY2pDxPaduLVXn37ftyXd5tUBeA9hRdx4whZwCAQCAQCAQCAl4Ge30Q9ClQcEezdgbr8QIGSV4SyO/K/W0m5o6/hIP6pU1HWHe7Ht6lo98fz/xlsT7D245Wt32miOrrZI4qTHudfwdXNTRveRW8RedJ4ueqQDCHoQHsP7QgTMsD2iwHlED3CReBzXf9r49B7uHP+px/wBsp6rueh7CjnefdCglR6MQOvbDTLhaC+7RpA9+UXnUxxtWI9zwertxZ728bT8068yVxeSJWzhdz2CELKAQCAQCAQCAQC0Cv23RD0HU6giBzHOaVTon4E/Vuev7p7fz/MKXfYXp0m5Oy/iW/wCmV88codjsi3r2j3fKf9snKrvOnbs1s2Dw7c6FK/flE6NZ5PG5I2tMLYGSwehCD2H9oQLECB7UQPcJF4ATIHMN9XvtBvu0KQ8Wf9pT1Xc9J2FHK8+X1U0qvQA8NIIl2WiLKByAHgJ1ofPbTvMyczQxGaSJ+yiPWPcPzhCxgEAgEAgEAgEAgR8Yt0IgYDbuAV7qR/4kJ2YfeR2FA06mrI6sje+NV8bNNWaPVdDsy22fbxifv9GYBlN6OJdC3Mq3wVL7udPwuw8pfpPqw8pqo2zWj3y0KmZq5wGEHsOfWHfAtRAWAt4SS8BCZA5ZvY99o1+ynQX/AKz5ylqesPUdiR/TtPvVl5Wds/gVvVpr71WmviwEyrHOGrNbhx2nwifk64GnUeCklSuqgsxCgakk2AHfCEJMTVrG1BbL11XBA/pXr7z85KGg2RgjSSxZnYklmY6kwLFTA9gwFgEAgEAgEAgeKo0MDKbYoamQ2RDDbz4TpKTLbW2h5HqMwtzjZZwxNbxaOrnbAqxVtGHH95UtXZ6HDmjJG7c7iVf/AExX3a1QeJzfqlrF7MPP6+Ns9mqRpsUjymSH6B9Yd8IW0AvALwkl5A8kwlyjeJ74/Enk6L4IP3lHU+09V2LH9CfP6QgZpoddP2CL4qiP8VW/D63lM8Ub3hU11uHT3n3fPk6I20CxyUF6VuBI0pqe1uvuHynSeJlNwexCxD4hukYaheFND2L5m5ko2X9GkALAWkCUokj0BCCwFBgLAIBAIBAICGBTbVoXkS2VlkdqYPQzCVik82E2/sfN6yizDgfKa5jflK7S81niqXcStbp6TaMKivlPGxRRfuupmeKNo2VddaL5OKO+GzpPNiiko0kSKJ1EIW94BeEkJgeSZA8u0JhyLa9S+MxR/wAcjwRBKGo9t6zsiNtP8Z+iG1TW2pJ4AC5PcJqisz0dDJlrjje07NHuvsSo9VXqrlQXsnWbi2p8pZxY+Gd5cTXaucuOaVjaHUMBQVFAUAAchLW7hTXZZU1ksJSEWEHQJKHqECAQCAQFgEAgEAgQ8YlxIllCixuFveRLbWWcxuA7Jhs3xdR4nZRBz0/VddQfI8wZlVoy85Stn4vONRlddHXrB8x2zNpWdNoEmidYQuM0BC0Jec0BC0gQsfjkprd2tyGpZjyAGpPdDKHNaeycTXrVWyNSWpWd7uBmynQWHVoOuVb497by72l1no8EUrHNrti7sU6WpGZjxY6k/GZRG3KGq95tPFad5arBYO3VM6wrZb8lxQozZCnaUxEktcnQJLF6gEBYQIBAICwCAQCAQGawhMK6tTkMoVmKw0xbIlVVsLJhFlDtTZ7K3S09HXwYdamZNRzAYsOtxoRoynircjCFlRaBcZtICFoSbq1lUEsQoGpJNgIED6VVrHLQWy/xXBt/SvX3n5yBMwew1U53JqVDxdtT3DkOwQyhNo4Icuua5hbpbaEulhI2JyJtGhaZRDTa26UqTJq3OASUFhBYBAICwgQCAsAgEAgEDxUECHUWQyRqtOGUShVsPIJVmKw0lgzG0sE1N+lpDX7S9Try7+RkoTcBiVdQy8D1dYPWD2wL0PoO4QIFTaVzkor0r8CR7CntbyHygScJsRnIfENnI1C8EXuXzOsC/o4YKLAWkMj4pQmDlOjIZ7nlpxsiZOhZLGZeoQWSgQFgEAgEBYQICwCAQCAQPLQI7rISbKQyNtSg3Ra+EvDFVYrZt5Iz1fYdenUNSiAQ3toxsrdvYYQn0dk16tumOVP4aE2P8zcT8hA0GC2elMAKoFuQhKelOQH0pyQ4EkD0Fhlu9WgLCCyUCAQFgEAgEBRCCwCAQCAQCAhgNMIS82kAywEZJIYqUoQjtRge0pQHkpwk8qQHAIC2gEhIgLJQIBAICwCAQFAhBYBAIBAIBAICGA20JJAJADJHhoQZMD0sBxYDghJYBAJCRAUSUCAQCAsAgED1CBAIH//Z' />
								<br></br>
								{!this.state.allowAddPrize && 
								<Segment>
									<div>Fill Form to Enable Adding gift</div></Segment>}
								{this.state.allowAddPrize &&
								<Button primary size='huge' onClick ={() => this.setState(prevState => {
									return {
											showAddPrize: !prevState.showAddPrize
										}})}>
									Add Prizes
									<Icon name='right arrow' />
								</Button>}
								{this.state.showAddPrize && <AddPrizes />}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				}
				<Footer />
			</div>
		)
	}	
}
export default NewOrgPage;