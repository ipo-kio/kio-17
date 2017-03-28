function [t, solve]=batman3(v0, theta0, B, C, tmax)

g = 9.81;

#1 2 3 4
#v T x y

f = @(a, t) [
  -g * sin(a(2)) - C * a(1) * a(1)
  (B * a(1) * a(1) - g * cos(a(2))) / a(1)
  a(1) * cos(a(2))
  a(1) * sin(a(2))
];

t = 0:0.01:tmax;
solve = lsode(f, [v0, theta0, 0, 0], t);

endfunction