export const HILL_HEIGHT = 25;
export const g = 9.81;

export const poses = [
    {
        B: 0.5,
        C: 0.05
    },
    {
        B: 0.05,
        C: 0.05
    },
    {
        B: 0.005,
        C: 0.05
    }
];

export function get_pose(ind) {
    return poses[ind - 1];
}