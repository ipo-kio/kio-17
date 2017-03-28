function [t, solve]=batman(v0, theta0, B, C, tmax)

g = 9.81;

A = C / B;

f = @(a, tau) [
  -sin(a(2)) - A * a(1) * a(1)
  (a(1) * a(1) - cos(a(2))) / a(1)
  a(1) * cos(a(2))
  a(1) * sin(a(2))
];

v1 = sqrt(g / B);
t1 = 1 / sqrt(g * B);
tau_max = tmax / t1;

taus = linspace(0, tau_max, 1001);
solve = lsode(f, [v0 / v1, theta0, 0, 0], taus);

t = taus * t1;
solve(:, 1) = solve(:, 1) * v1;
solve(:, 3) = solve(:, 3) / B;
solve(:, 4) = solve(:, 4) / B;

endfunction