export const HILL_HEIGHT = 25;
export const g = 9.81;

export const poses = [
    {
        B: 0.01,
        C: 0.12
    },
    {
        B: 0.03,
        C: 0.12
    },
    {
        B: 0.08,
        C: 0.12
    }
];

export function get_pose(ind) {
    return poses[ind - 1];
}