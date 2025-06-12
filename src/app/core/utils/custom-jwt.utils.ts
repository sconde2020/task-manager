import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';


export class CustomJwtUtils {

  public static decodeToken(token: string): JwtPayload {
    return jwtDecode(token);
  }
  
}
