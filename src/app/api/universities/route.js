import { pool } from '@/app/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const gpa = searchParams.get('gpa');
  const ielts = searchParams.get('ielts');
  const search = searchParams.get('search') || '';

  const result = await pool.query(
    `
    SELECT *,
      CASE
        WHEN $3 < min_gpa OR $4 < min_ielts THEN 'Not Eligible'
        ELSE 'Eligible'
      END AS status
    FROM universities
    WHERE tuition_fee BETWEEN $1 AND $2
      AND (
      LOWER(country) LIKE LOWER($5)
      or LOWER(degree) LIKE LOWER($5)
      )
    `,
    [min, max, gpa, ielts, `%${search}%`]
  );

  return Response.json(result.rows);
}
