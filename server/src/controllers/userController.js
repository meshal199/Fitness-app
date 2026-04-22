import User from "../models/User.js";

export async function listUsers(req, res) {
  const { role, search } = req.query;
  const query = {};

  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  const users = await User.find(query).select("-password").sort({ createdAt: -1 });
  res.json(users);
}
