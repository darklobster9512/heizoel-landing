export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      application_documents: {
        Row: {
          application_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          kind: string
          mime_type: string | null
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          kind: string
          mime_type?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          kind?: string
          mime_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      banks: {
        Row: {
          active: boolean
          city: string | null
          company_name: string | null
          created_at: string
          documents: string
          eff_rate: number
          free_full_repayment: boolean
          free_special_repayment: boolean
          id: string
          logo_key: string | null
          logo_url: string | null
          max_amount: number
          max_term: number
          min_amount: number
          min_term: number
          name: string
          online_id: boolean
          online_upload: boolean
          payment_break: boolean
          payout_days: number
          sort_order: number
          street: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          active?: boolean
          city?: string | null
          company_name?: string | null
          created_at?: string
          documents?: string
          eff_rate?: number
          free_full_repayment?: boolean
          free_special_repayment?: boolean
          id?: string
          logo_key?: string | null
          logo_url?: string | null
          max_amount?: number
          max_term?: number
          min_amount?: number
          min_term?: number
          name: string
          online_id?: boolean
          online_upload?: boolean
          payment_break?: boolean
          payout_days?: number
          sort_order?: number
          street?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          active?: boolean
          city?: string | null
          company_name?: string | null
          created_at?: string
          documents?: string
          eff_rate?: number
          free_full_repayment?: boolean
          free_special_repayment?: boolean
          id?: string
          logo_key?: string | null
          logo_url?: string | null
          max_amount?: number
          max_term?: number
          min_amount?: number
          min_term?: number
          name?: string
          online_id?: boolean
          online_upload?: boolean
          payment_break?: boolean
          payout_days?: number
          sort_order?: number
          street?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      loan_applications: {
        Row: {
          adults: number | null
          alimony_child: boolean | null
          alimony_child_amount: number | null
          alimony_spouse: boolean | null
          alimony_spouse_amount: number | null
          amount: number | null
          bank_account_number: string | null
          bank_code: string | null
          bank_country: string | null
          bank_detail_type: string | null
          bank_iban: string | null
          bank_id: string | null
          bank_name: string | null
          birthcountry: string | null
          birthdate: string | null
          birthplace: string | null
          borrowers: number | null
          child_support_amount: number | null
          children: number | null
          children_kindergeld: number | null
          city: string | null
          contract_extended: boolean | null
          country: string | null
          created_at: string
          down_payment: number | null
          eff_rate: number | null
          email: string | null
          employed_since: string | null
          employer: string | null
          existing_loans: number | null
          first_name: string | null
          full_data: Json | null
          house_number: string | null
          housing: string | null
          id: string
          income_variation: boolean | null
          insurance: string | null
          last_name: string | null
          loan_amount_adjust: string | null
          loan_amount_custom: number | null
          loans: Json | null
          marital_status: string | null
          marketing_consent: boolean | null
          monthly_rate: number | null
          more_nationalities: boolean | null
          nationality: string | null
          net_income: number | null
          other_income: boolean | null
          owns_car: boolean | null
          part_time: boolean | null
          part_time_type: string | null
          pension_amount: number | null
          phone: string | null
          private_health: boolean | null
          private_health_amount: number | null
          profession: string | null
          purpose: string | null
          referral_source: string | null
          relationship: string | null
          rental_income: number | null
          rented_property: boolean | null
          rented_property_area: number | null
          rented_property_type: string | null
          resident_since: number | null
          salutation: string | null
          second_nationality: string | null
          selected_insurance: string | null
          side_job: boolean | null
          side_job_count: number | null
          side_jobs: Json | null
          status: string
          street: string | null
          temporary_contract: boolean | null
          temporary_contract_until: string | null
          term_months: number | null
          total_amount: number | null
          updated_at: string
          user_id: string | null
          warm_rent: number | null
          zip: string | null
        }
        Insert: {
          adults?: number | null
          alimony_child?: boolean | null
          alimony_child_amount?: number | null
          alimony_spouse?: boolean | null
          alimony_spouse_amount?: number | null
          amount?: number | null
          bank_account_number?: string | null
          bank_code?: string | null
          bank_country?: string | null
          bank_detail_type?: string | null
          bank_iban?: string | null
          bank_id?: string | null
          bank_name?: string | null
          birthcountry?: string | null
          birthdate?: string | null
          birthplace?: string | null
          borrowers?: number | null
          child_support_amount?: number | null
          children?: number | null
          children_kindergeld?: number | null
          city?: string | null
          contract_extended?: boolean | null
          country?: string | null
          created_at?: string
          down_payment?: number | null
          eff_rate?: number | null
          email?: string | null
          employed_since?: string | null
          employer?: string | null
          existing_loans?: number | null
          first_name?: string | null
          full_data?: Json | null
          house_number?: string | null
          housing?: string | null
          id?: string
          income_variation?: boolean | null
          insurance?: string | null
          last_name?: string | null
          loan_amount_adjust?: string | null
          loan_amount_custom?: number | null
          loans?: Json | null
          marital_status?: string | null
          marketing_consent?: boolean | null
          monthly_rate?: number | null
          more_nationalities?: boolean | null
          nationality?: string | null
          net_income?: number | null
          other_income?: boolean | null
          owns_car?: boolean | null
          part_time?: boolean | null
          part_time_type?: string | null
          pension_amount?: number | null
          phone?: string | null
          private_health?: boolean | null
          private_health_amount?: number | null
          profession?: string | null
          purpose?: string | null
          referral_source?: string | null
          relationship?: string | null
          rental_income?: number | null
          rented_property?: boolean | null
          rented_property_area?: number | null
          rented_property_type?: string | null
          resident_since?: number | null
          salutation?: string | null
          second_nationality?: string | null
          selected_insurance?: string | null
          side_job?: boolean | null
          side_job_count?: number | null
          side_jobs?: Json | null
          status?: string
          street?: string | null
          temporary_contract?: boolean | null
          temporary_contract_until?: string | null
          term_months?: number | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
          warm_rent?: number | null
          zip?: string | null
        }
        Update: {
          adults?: number | null
          alimony_child?: boolean | null
          alimony_child_amount?: number | null
          alimony_spouse?: boolean | null
          alimony_spouse_amount?: number | null
          amount?: number | null
          bank_account_number?: string | null
          bank_code?: string | null
          bank_country?: string | null
          bank_detail_type?: string | null
          bank_iban?: string | null
          bank_id?: string | null
          bank_name?: string | null
          birthcountry?: string | null
          birthdate?: string | null
          birthplace?: string | null
          borrowers?: number | null
          child_support_amount?: number | null
          children?: number | null
          children_kindergeld?: number | null
          city?: string | null
          contract_extended?: boolean | null
          country?: string | null
          created_at?: string
          down_payment?: number | null
          eff_rate?: number | null
          email?: string | null
          employed_since?: string | null
          employer?: string | null
          existing_loans?: number | null
          first_name?: string | null
          full_data?: Json | null
          house_number?: string | null
          housing?: string | null
          id?: string
          income_variation?: boolean | null
          insurance?: string | null
          last_name?: string | null
          loan_amount_adjust?: string | null
          loan_amount_custom?: number | null
          loans?: Json | null
          marital_status?: string | null
          marketing_consent?: boolean | null
          monthly_rate?: number | null
          more_nationalities?: boolean | null
          nationality?: string | null
          net_income?: number | null
          other_income?: boolean | null
          owns_car?: boolean | null
          part_time?: boolean | null
          part_time_type?: string | null
          pension_amount?: number | null
          phone?: string | null
          private_health?: boolean | null
          private_health_amount?: number | null
          profession?: string | null
          purpose?: string | null
          referral_source?: string | null
          relationship?: string | null
          rental_income?: number | null
          rented_property?: boolean | null
          rented_property_area?: number | null
          rented_property_type?: string | null
          resident_since?: number | null
          salutation?: string | null
          second_nationality?: string | null
          selected_insurance?: string | null
          side_job?: boolean | null
          side_job_count?: number | null
          side_jobs?: Json | null
          status?: string
          street?: string | null
          temporary_contract?: boolean | null
          temporary_contract_until?: string | null
          term_months?: number | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
          warm_rent?: number | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_bank_id_fkey"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "banks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
