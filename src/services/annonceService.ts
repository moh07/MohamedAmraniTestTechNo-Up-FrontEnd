import http from "../http-common";

export interface annonceResponse {
  id: number
  description: string
  image: string
  name: string
  price:number
  type: string

}
  export function getAll() {
    return http.get('/getAnnonces')
  }
  export function deleteAnnonce(id:number) {
    return http.get('/deleteAnnonce/?id='+id)
  }


