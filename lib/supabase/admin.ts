import 'server-only';
import { createSupabaseAdminClient } from './admin-client';

export const supabaseAdmin = createSupabaseAdminClient();
