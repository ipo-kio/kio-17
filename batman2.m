function [t, solve]=batman2(v0, theta0, phi0, phidt0, B0, C0, C1, M, tmax)

g = 9.81;

#1 2 3 4 5 6
#v T x y F f

f = @(a, t) [
  -g * sin(a(2)) - (C0 - C1 * cos(2*(a(2) - a(5)))) * a(1) * a(1)
  (B0 * sin(2*(a(2) - a(5))) * a(1) * a(1) - g * cos(a(2))) / a(1)
  a(1) * cos(a(2))
  a(1) * sin(a(2))
  a(6)
  M
];

t = 0:0.01:tmax;
solve = lsode(f, [v0, theta0, 0, 0, phi0, phidt0], t);

endfunction