import pkg from 'pg';
const { Client } = pkg;

export const cors_headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
  
export const response = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: cors_headers
    }
}

export const access_denied_response = response(403, 'Access Denied');

export const executeQuery = async (query, params = []) => {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  
    try {
      await client.connect();
      const res = await client.query(query, params);
      console.log(res);
      return res;
    } catch (err) {
      console.error('Database operation failed:', err);
      throw err;
    } finally {
      await client.end();
    }
};

export const getStreamingVideoFromUtils = async (videoId) => {
    const res = await executeQuery('SELECT v.video_object, v.transcript_object ' +
                                 'FROM services.video v ' +
                                 'WHERE v.video_id = $1 ', [videoId]);
    return res;
}

export const getAllVideosForCourseFromUtils = async (courseId) => {
    const res = await executeQuery('SELECT v.video_id id, v.video_name name ' +
                                 'FROM mappings.course_video cv INNER JOIN services.video v ON v.video_id = cv.video_id ' +
                                 'WHERE cv.course_id = $1 ' +
                                 'ORDER BY v.video_id ASC ', [courseId]);
    return res;
}