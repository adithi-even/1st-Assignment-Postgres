
import Assessment from "../models/assessment.model.js";
import Result from "../models/result.model.js";

 const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let dashboardData = {};

    if (userRole === 'content_creator') {
      const createdAssessments = await Assessment.findAll({ where: { createdBy: userId } });
      dashboardData = { ...dashboardData, createdAssessments };
    } else if (userRole === 'end_user') {
      const recentResults = await Result.findAll({ where: { userId }, limit: 5, order: [['createdAt', 'DESC']] });
      dashboardData = { ...dashboardData, recentResults };
    }

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};

export default getDashboardData;