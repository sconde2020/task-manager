import { TestBed } from '@angular/core/testing';
import { CustomJwtUtils } from './custom-jwt.utils';
import { JwtPayload } from 'jwt-decode';


describe('CustomJwtUtils', () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzY29uZGUiLCJpYXQiOjE3NDkzODYzNjgsImV4cCI6MTc0OTM4OTk2OH0.xwaymHv2T5PUK39KS1hBRad5PTxtZXn48atcEDwv9WU";
  const decodeToken: JwtPayload = {
      "sub": "sconde",
      "iat": 1749386368,
      "exp": 1749389968
    } ;    

  it('should decode a valid JWT token', () => {
    expect(CustomJwtUtils.decodeToken(token)).toEqual(decodeToken);
  });

});
