import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { getCurrentUser } from "../service/AuthService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";


export default function StatisticsDashboard() {
  const [stats, setStats] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getCurrentUser();
        const response = await axiosClient.get(`/api/statistiques`);
        setStats(response.data);

        const langs = [...new Set(response.data.map(stat => stat.langage))];
        setLanguages(langs);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  const filteredStats = selectedLanguage
    ? stats.filter(stat => stat.langage === selectedLanguage)
    : stats;

  const languageProgressData = languages.map((lang) => {
    const langStats = stats.filter(stat => stat.langage === lang);
    const totalScore = langStats.reduce((sum, s) => sum + s.reussiteMoyenne, 0);
    const averageScore = langStats.length ? totalScore / langStats.length : 0;

    return {
      name: lang,
      score: averageScore.toFixed(2),
      color: "#" + Math.floor(Math.random()*16777215).toString(16)
    };
  });

  const pieData = [
    {
      name: "Correct Answers",
      value: filteredStats.reduce((sum, s) => sum + s.questions_correctes, 0)
    },
    {
      name: "Incorrect Answers",
      value: filteredStats.reduce((sum, s) => sum + (s.total_questions - s.questions_correctes), 0)
    }
  ];

  const timeSeriesData = filteredStats.map(stat => ({
    date: new Date(stat.created_at).toLocaleDateString(),
    success: stat.reussiteMoyenne
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const TimeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${label}`}</p>
          <p>{`Time: ${payload[0].value} sec`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Quiz totaux</h3>
          </div>
          <div className="card-content">
            <div className="card-value">{stats.length}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Succès moyen</h3>
          </div>
          <div className="card-content">
            <div className="card-value">
              {(
                stats.reduce((sum, stat) => sum + stat.reussiteMoyenne, 0) /
                stats.length || 0
              ).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Langues maîtrisées</h3>
          </div>
          <div className="card-content">
            <div className="card-value">{languages.length}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Temps moyen</h3>
          </div>
          <div className="card-content">
            <div className="card-value">
              {(
                stats.reduce((sum, stat) => sum + stat.temps_total, 0) /
                stats.length || 0
              ).toFixed(0)} sec
            </div>
          </div>
        </div>
      </div>

      {/* Language Filter */}
      <div className="language-filter">
        <h3 className="filter-title">Filtrer par langue :</h3>
        <select
          className="filter-select"
          value={selectedLanguage || ''}
          onChange={(e) => setSelectedLanguage(e.target.value || null)}
        >
          <option value="">Toutes les langues</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Progress by Language */}
      <div className="chart-card full-width">
        <div className="chart-header">
          <h3 className="chart-title">Progrès par langue</h3>
        </div>
        <div className="chart-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={languageProgressData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 100]} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {languageProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Accuracy Pie Chart */}
      <div className="chart-card half-width">
        <div className="chart-header">
          <h3 className="chart-title">Précision</h3>
        </div>
        <div className="chart-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#4CAF50' : '#F44336'}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Time Spent */}
      <div className="chart-card half-width">
        <div className="chart-header">
          <h3 className="chart-title">Temps passé par quiz</h3>
        </div>
        <div className="chart-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredStats.slice(0, 10).map(stat => ({
                  name: new Date(stat.created_at).toLocaleDateString(),
                  time: stat.temps_total,
                  language: stat.langage
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} unit=" sec" />
                <Tooltip content={<TimeTooltip />} />
                <Bar dataKey="time" radius={[4, 4, 0, 0]} maxBarSize={60} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="chart-card full-width">
        <div className="chart-header">
          <h3 className="chart-title">Progrès au fil du temps</h3>
        </div>
        <div className="chart-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 100]} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="success"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Quizzes Table */}
      <div className="chart-card full-width">
        <div className="chart-header">
          <h3 className="chart-title">Quiz récents</h3>
        </div>
        <div className="chart-content">
          <div className="table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Langage</th>
                  <th>Score</th>
                  <th>Correcte</th>
                  <th>Temps</th>
                </tr>
              </thead>
              <tbody>
                {stats.slice(0, 5).map((stat) => (
                  <tr key={stat.id}>
                    <td>{new Date(stat.created_at).toLocaleDateString()}</td>
                    <td>{stat.langage}</td>
                    <td>{!isNaN(Number(stat.reussiteMoyenne))
                  ? Number(stat.reussiteMoyenne).toFixed(2) + " %"
                  : "Non disponible"}%</td>
                    <td>{stat.questions_correctes}/{stat.total_questions}</td>
                    <td>{stat.temps_total} sec</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
