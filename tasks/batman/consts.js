export const HILL_HEIGHT = 25;
export const g = 9.81;

export const poses = [
    {
        C: 0.01,
        B: 0.12
    },
    {
        C: 0.03,
        B: 0.12
    },
    {
        C: 0.08,
        B: 0.12
    }
];

export function get_pose(ind) {
    return poses[ind - 1];
}