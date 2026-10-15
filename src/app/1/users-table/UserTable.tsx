"use client";

import { UserDataType } from "./userType";

export default function UserTable({
  getFiltedredUsersData,
}: {
  getFiltedredUsersData: () => UserDataType[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>CITY</th>
          <th>EXPERIENCE</th>
          <th>ROLE</th>
          <th>SALARY</th>
          <th>SKILLS</th>
          <th>ACTIVE</th>
        </tr>
      </thead>
      <tbody>
        {getFiltedredUsersData().map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>{`${user.experience} Years`}</td>
              <td>{user.role}</td>
              <td>{user.salary}</td>
              <td>{user.skills.map((skill) => skill + " ")}</td>
              <td>
                {user.isActive ? (
                  <span style={{ color: "green" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>Inactive</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
